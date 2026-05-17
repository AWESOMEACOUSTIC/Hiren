import { createContext, useState } from "react";

export const InterviewContext = createContext()

export const InterviewProvider = ({ children }) => {
    const [interviewReport, setInterviewReport] = useState(null)
    const [loading, setLoading] = useState(false)

    const value = {
        interviewReport,
        setInterviewReport,
        loading,
        setLoading
    }

    return (
        <InterviewContext.Provider value={value}>
            {children}
        </InterviewContext.Provider>
    )
}