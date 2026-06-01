const rawBaseUrl =
	import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api'

export const API_BASE_URL = rawBaseUrl.trim().replace(/\/+$/, '')
