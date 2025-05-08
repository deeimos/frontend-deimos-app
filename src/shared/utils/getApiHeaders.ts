import { AxiosRequestConfig } from 'axios'

const getApiHeaders = (token?: string): AxiosRequestConfig => {
	if (!token) return {}

	return { headers: { Authorization: `Bearer ${token}` } }
}

export default getApiHeaders
