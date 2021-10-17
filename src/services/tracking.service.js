import RestClient from './rest-client'
import { get, queryParams } from 'common/func.utils'

export const fetchMetaDataInfo = () => {
  const fetchUsers = RestClient.get('/tracking/user')
  const fetchMetas = RestClient.get('/tracking/user/metadata')
  return Promise.all([fetchUsers, fetchMetas])
}

export const fetchIssues = async (params) => {
  try {
    return (await RestClient.get(`/tracking/issue?${queryParams(params)}`)).data
  } catch (error) {
    throw get(error, ['response', 'data', 'message'], error.message)
  }
}
