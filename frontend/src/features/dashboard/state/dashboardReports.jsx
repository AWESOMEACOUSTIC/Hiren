import { createContext, useState } from 'react'

export const DashboardReportsContext = createContext()

export const DashboardReportsProvider = ({ children }) => {
	const [report, setReport] = useState(null)
	const [reports, setReports] = useState([])
	const [loading, setLoading] = useState(false)

	const value = {
		report,
		setReport,
		reports,
		setReports,
		loading,
		setLoading,
	}

	return (
		<DashboardReportsContext.Provider value={value}>
			{children}
		</DashboardReportsContext.Provider>
	)
}
