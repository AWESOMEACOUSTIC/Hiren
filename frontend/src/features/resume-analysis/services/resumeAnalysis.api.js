import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:4000/api/interview",
    withCredentials: true
})

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