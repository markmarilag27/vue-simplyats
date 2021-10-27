import httpClient from '@/services/http-client'

const ENDPOINT = '/api/auth'

// get csrf token
export const getCsrfToken = async () => {
  try {
    const response = await httpClient.get('/sanctum/csrf-cookie')
    return response.status
  } catch (error) {
    return Promise.all(error)
  }
}

// send the login credentials
export const postLogin = async (credentials) => {
  try {
    const response = await httpClient.post(`${ENDPOINT}/login`, credentials)
    return await response.data
  } catch (error) {
    return Promise.all(error)
  }
}

// get the authenticated user data
export const getAuthUserData = async () => {
  try {
    const response = await httpClient.get(`${ENDPOINT}/me`)
    return await response.data
  } catch (error) {
    return Promise.reject(error)
  }
}

// send the logout
export const postLogout = async () => {
  try {
    const response = await httpClient.post(`${ENDPOINT}/logout`)
    return response.status
  } catch (error) {
    return Promise.reject(error)
  }
}
