import { generateInterviewReport } from "../services/resumeAnalysis.api.js"
import { useContext } from "react"
import { InterviewContext } from "../state/resumeAnalysis.jsx"

export const useAnalysis = () => {
    const context = useContext(InterviewContext)

    if (!context) {
        throw new Error("useAnalysis must be used within an InterviewProvider")
    }

    const { loading, setLoading, interviewReport, setInterviewReport } = context

    const handleGenerateReport = async ({ jobDescription, selfDescription, resumeFile }) => {
        setLoading(true)
        try {
            const reportData = await generateInterviewReport({ jobDescription, selfDescription, resumeFile })
            setInterviewReport(reportData.interviewReport || reportData)
            return reportData
        } catch (error) {
            console.error("Error generating interview report:", error)
            throw error
        } finally {
            setLoading(false)
        }
    }

    return { loading, interviewReport, handleGenerateReport }
}