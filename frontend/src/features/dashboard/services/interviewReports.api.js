import { createApiClient } from '../../../services/http/client.js'

const api = createApiClient('/interview')

export const getInterviewReportById = async (interviewId) => {
	try {
		const response = await api.get(`/reports/${interviewId}`)
		return response.data
	} catch (error) {
		console.error('Failed to fetch interview report:', error)
		throw error
	}
}

export const getAllInterviewReportsForUser = async () => {
	try {
		const response = await api.get('/')
		return response.data
	} catch (error) {
		console.error('Failed to fetch interview reports for user:', error)
		throw error
	}
}
