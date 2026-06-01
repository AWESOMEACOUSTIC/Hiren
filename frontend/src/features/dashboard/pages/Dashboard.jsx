import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import DashboardLayout from '../components/DashboardLayout.jsx'
import DashboardSection from '../components/DashboardSection.jsx'
import MatchScoreCard, { MatchScoreIcons } from '../components/MatchScoreCard.jsx'
import QuestionList from '../components/QuestionList.jsx'
import RoadmapCard from '../components/RoadmapCard.jsx'
import Sidebar from '../components/Sidebar.jsx'
import SkillGapsCard from '../components/SkillGapsCard.jsx'
import TopBar from '../components/TopBar.jsx'
import { useInterviewReports } from '../hooks/useInterviewReports.js'

const Dashboard = () => {
	const { reportId } = useParams()
	const [activeSection, setActiveSection] = useState('technical')
	const {
		report,
		loading,
		handleGetReportById,
		handleGetReports,
	} = useInterviewReports()

	useEffect(() => {
		const loadReport = async () => {
			try {
				if (reportId) {
					await handleGetReportById(reportId)
					return
				}

				if (report?._id) {
					return
				}

				const reportsData = await handleGetReports()
				const latestReport = reportsData?.interviewReports?.[0]
				if (latestReport?._id) {
					await handleGetReportById(latestReport._id)
				}
			} catch (error) {
				console.error('Error loading dashboard report:', error)
			}
		}

		loadReport()
	}, [handleGetReportById, handleGetReports, report?._id, reportId])

	const technicalQuestions = (report?.technicalQuestions || []).map(
		(item, index) => ({
			title: item.question || `Technical Question ${index + 1}`,
			intention: item.intention,
			description: item.answer,
		})
	)

	const behavioralSource = report?.behavioralQuestions || report?.behaviouralQuestions

	const behavioralQuestions = (behavioralSource || []).map((item, index) => ({
		title: item.question || `Behavioral Prompt ${index + 1}`,
		intention: item.intention,
		description: item.answer,
	}))

	const skillGaps = (report?.skillGaps || [])
		.map((gap) => (typeof gap === 'string' ? gap : gap.skill))
		.filter(Boolean)
		.map((skill) => `# ${skill}`)

	const preparationResources = report?.preparationResources || []

	const roadmapItems = preparationResources.map((item, index) => ({
		phase: `Day ${item.day || index + 1}`,
		title: `Preparation Focus ${index + 1}`,
		summary: item.resource || 'Recommended preparation resource.',
		badge: index === 0 ? 'Active' : 'Next',
		tags: [],
	}))

	const matchScore =
		typeof report?.matchScore === 'number' ? Math.round(report.matchScore) : 0

	const topGap = (report?.skillGaps || []).find(
		(gap) => gap?.severity === 'high'
	)
		|| (report?.skillGaps || [])[0]

	const insights = []

	if (report?.title) {
		insights.push({
			icon: MatchScoreIcons.Check,
			text: `Assessment: ${report.title}`,
			tone: 'text-[#c7bfff]',
		})
	}

	if (topGap) {
		const gapSkill = typeof topGap === 'string' ? topGap : topGap.skill
		const gapSeverity =
			typeof topGap === 'string'
				? null
				: topGap.severity
		const tone = gapSeverity === 'high' ? 'text-[#ffb4ab]' : 'text-[#90cdff]'
		const label = gapSeverity ? gapSeverity.toUpperCase() : 'MODERATE'
		insights.push({
			icon: MatchScoreIcons.Alert,
			text: `Top gap: ${gapSkill} (${label})`,
			tone,
		})
	}

	if (preparationResources.length > 0) {
		insights.push({
			icon: MatchScoreIcons.Spark,
			text: `${preparationResources.length} prep items ready`,
			tone: 'text-[#90cdff]',
		})
	}

	return (
		<DashboardLayout
			rightPanel={
				<>
					<SkillGapsCard gaps={skillGaps} />
					<MatchScoreCard insights={insights} score={matchScore} />
				</>
			}
			sidebar={<Sidebar activeKey={activeSection} onNavigate={setActiveSection} />}
		>
			<TopBar />
			{activeSection === 'technical' ? (
				<DashboardSection
					activeTab="Recent"
					subtitle="Resume your active practice sessions or explore new algorithmic challenges."
					tabs={['Recent', 'Saved']}
					title="Technical Interview Prep"
				>
					{technicalQuestions.length ? (
						<QuestionList questions={technicalQuestions} />
					) : (
						<p className="text-sm text-[#928ea0]">
							{loading
								? 'Loading technical questions...'
								: 'No technical questions available yet.'}
						</p>
					)}
				</DashboardSection>
			) : null}
			{activeSection === 'behavioral' ? (
				<DashboardSection
					subtitle="Practice high-signal narratives for leadership, conflict, and ownership questions."
					title="Behavioral Interview Prep"
				>
					{behavioralQuestions.length ? (
						<QuestionList
							label="Behavioral Prompt"
							questions={behavioralQuestions}
						/>
					) : (
						<p className="text-sm text-[#928ea0]">
							{loading
								? 'Loading behavioral prompts...'
								: 'No behavioral prompts available yet.'}
						</p>
					)}
				</DashboardSection>
			) : null}
			{activeSection === 'roadmap' ? (
				<DashboardSection
					subtitle="Track your progression across deep systems topics and targeted interview drills."
					title="Road Map"
				>
					{roadmapItems.length ? (
						<div className="space-y-5">
							{roadmapItems.map((item) => (
								<RoadmapCard
									badge={item.badge}
									key={`${item.phase}-${item.title}`}
									phase={item.phase}
									summary={item.summary}
									tags={item.tags}
									title={item.title}
								/>
							))}
						</div>
					) : (
						<p className="text-sm text-[#928ea0]">
							{loading
								? 'Loading roadmap...'
								: 'No preparation roadmap available yet.'}
						</p>
					)}
				</DashboardSection>
			) : null}
		</DashboardLayout>
	)
}

export default Dashboard
