import axios from 'axios'

const api = axios.create({
	baseURL: 'http://localhost:4000/api/interview',
	withCredentials: true,
})

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
