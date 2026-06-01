import { createApiClient } from '../../../services/http/client.js'

const api = createApiClient('/interview')

export const generateInterviewReport = async ({ jobDescription, selfDescription, resumeFile }) => {
    try {
        const formData = new FormData()
        formData.append("jobDescription", jobDescription)
        formData.append("selfDescription", selfDescription)
        if (resumeFile) {
            formData.append("resume", resumeFile)
        }

        const response = await api.post("/", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })

        return response.data
    } catch (error) {
        console.error("Failed to generate interview report:", error)
        throw error
    }
}