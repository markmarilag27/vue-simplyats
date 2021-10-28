import httpClient from '@/services/http-client'

const ENDPOINT = '/api/jobs'

/**
 * Get all jobs
 *
 * @param URLSearchParams params
 * @returns
 */
export const getJobs = async params => {
  try {
    const response = await httpClient.get(ENDPOINT, { params })
    return await response.data
  } catch (error) {
    return Promise.reject(error)
  }
}

/**
 * Create a new job
 *
 * @param object data
 * @returns
 */
export const createJob = async data => {
  try {
    const response = await httpClient.post(ENDPOINT, data)
    return await response.data
  } catch (error) {
    return Promise.reject(error)
  }
}
/**
 * Update existing job
 *
 * @param string uuid
 * @param object data
 * @returns
 */
export const updateJob = async (uuid, data) => {
  try {
    const response = await httpClient.put(`${ENDPOINT}/${uuid}`, data)
    return await response.data
  } catch (error) {
    return Promise.reject(error)
  }
}

/**
 * Get the job
 *
 * @param string uuid
 * @returns
 */
export const showJob = async uuid => {
  try {
    const response = await httpClient.get(`${ENDPOINT}/${uuid}`)
    return await response.data
  } catch (error) {
    return Promise.reject(error)
  }
}

/**
 * Delete a job
 *
 * @param string uuid
 * @returns
 */
export const deleteJob = async uuid => {
  try {
    const response = await httpClient.delete(`${ENDPOINT}/${uuid}`)
    return response.status
  } catch (error) {
    return Promise.reject(error)
  }
}
