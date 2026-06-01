import axios from 'axios'
import { API_BASE_URL } from '../../config/api.js'

const normalizePath = (path = '') => {
	const trimmed = typeof path === 'string' ? path.trim() : ''
	if (!trimmed) {
		return ''
	}

	const cleanedPath = trimmed.split('/').filter(Boolean).join('/')
	return `/${cleanedPath}`
}

export const createApiClient = (resourcePath = '') =>
	axios.create({
		baseURL: `${API_BASE_URL}${normalizePath(resourcePath)}`,
		withCredentials: true,
	})
