import { useCallback, useContext } from 'react'
import { DashboardReportsContext } from '../state/dashboardReports.jsx'
import {
	getAllInterviewReportsForUser,
	getInterviewReportById,
} from '../services/interviewReports.api.js'

export const useInterviewReports = () => {
	const context = useContext(DashboardReportsContext)

	if (!context) {
		throw new Error('useInterviewReports must be used within a DashboardReportsProvider')
	}

	const { loading, setLoading, report, setReport, reports, setReports } = context

	const handleGetReportById = useCallback(
		async (interviewId) => {
			if (!interviewId) {
				return null
			}
			setLoading(true)
			try {
				const reportData = await getInterviewReportById(interviewId)
				setReport(reportData.interviewReport)
				return reportData
			} catch (error) {
				console.error('Error fetching interview report by ID:', error)
				throw error
			} finally {
				setLoading(false)
			}
		},
		[setLoading, setReport]
	)

	const handleGetReports = useCallback(async () => {
		setLoading(true)
		try {
			const reportsData = await getAllInterviewReportsForUser()
			setReports(reportsData.interviewReports)
			return reportsData
		} catch (error) {
			console.error('Error fetching interview reports for user:', error)
			throw error
		} finally {
			setLoading(false)
		}
	}, [setLoading, setReports])

	return { loading, report, reports, handleGetReportById, handleGetReports }
}
