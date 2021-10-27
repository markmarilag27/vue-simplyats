import httpClient from '@/services/http-client'

const ENDPOINT = '/api/applicants'

/**
 * Get all applicants
 *
 * @param URLSearchParams params
 * @returns
 */
export const getApplicants = async params => {
  try {
    const response = await httpClient.get(ENDPOINT, { params })
    return await response.data
  } catch (error) {
    return Promise.reject(error)
  }
}

/**
 * Get total
 *
 * @returns
 */
export const getTotal = async () => {
  try {
    const response = await httpClient.get(`${ENDPOINT}/total`)
    return await response.data
  } catch (error) {
    return Promise.reject(error)
  }
}

/**
 * Approve or reject applicant
 *
 * @param string uuid
 * @param object data
 * @returns
 */
export const postApplicantAction = async (uuid, data) => {
  try {
    const response = await httpClient.post(`${ENDPOINT}/${uuid}/action`, data)
    return await response.data
  } catch (error) {
    return Promise.reject(error)
  }
}
