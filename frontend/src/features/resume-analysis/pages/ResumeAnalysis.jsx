import { useState } from 'react'
import { useNavigate } from 'react-router'
import { motion } from 'motion/react'
import ResumeAnalysisBackground from '../components/ResumeAnalysisBackground.jsx'
import ResumeAnalysisFooter from '../components/ResumeAnalysisFooter.jsx'
import ResumeAnalysisHeader from '../components/ResumeAnalysisHeader.jsx'
import ResumeAnalysisHero from '../components/ResumeAnalysisHero.jsx'
import JobDescriptionCard from '../components/JobDescriptionCard.jsx'
import ProfileCard from '../components/ProfileCard.jsx'
import StrategyBar from '../components/StrategyBar.jsx'
import { useAnalysis } from '../hooks/useAnalysis.js'

const MAX_JOB_DESCRIPTION = 5000

const ResumeAnalysis = () => {
	const [jobDescription, setJobDescription] = useState('')
	const [selfDescription, setSelfDescription] = useState('')
	const [resumeFile, setResumeFile] = useState(null)
	const navigate = useNavigate()
	const { loading, handleGenerateReport } = useAnalysis()

	const characterCount = jobDescription.length

	const canGenerate = jobDescription.trim().length > 0 && Boolean(resumeFile)

	const handleGenerate = async () => {
		if (!canGenerate || loading) {
			return
		}

		try {
			const reportData = await handleGenerateReport({
				jobDescription,
				selfDescription,
				resumeFile,
			})
			const reportId = reportData?.interviewReport?._id || reportData?.interviewReport?.id
			navigate(reportId ? `/auth/dashboard/${reportId}` : '/auth/dashboard')
		} catch (error) {
			console.error('Failed to generate report:', error)
		}
	}

	return (
		<main className="min-h-screen bg-[#171213] text-[#ebe0e1]">
			<div className="relative overflow-hidden font-['Space_Grotesk']">
				<ResumeAnalysisBackground />
				<ResumeAnalysisHeader />

				<section className="relative mx-auto w-full max-w-6xl px-6 pb-20 pt-12">
					<ResumeAnalysisHero
						accent="Interview Plan"
						subtitle="Let our AI analyze the job requirements and your unique profile to build a winning strategy."
						title="Create Your Custom"
					/>

					<motion.div
						animate={{ opacity: 1, y: 0 }}
						className="mt-10 grid gap-6 lg:grid-cols-2"
						initial={{ opacity: 0, y: 16 }}
						transition={{ duration: 0.7, ease: 'easeOut', delay: 0.22 }}
					>
						<JobDescriptionCard
							characterCount={characterCount}
							maxLength={MAX_JOB_DESCRIPTION}
							onChange={setJobDescription}
							value={jobDescription}
						/>
						<ProfileCard
							onResumeChange={setResumeFile}
							onSelfDescriptionChange={setSelfDescription}
							resumeFile={resumeFile}
							selfDescription={selfDescription}
						/>
					</motion.div>

					<StrategyBar
						canGenerate={canGenerate}
						isLoading={loading}
						onGenerate={handleGenerate}
					/>
				</section>

				<ResumeAnalysisFooter />
			</div>
		</main>
	)
}

export default ResumeAnalysis
