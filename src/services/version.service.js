import RestClient from './rest-client'
import { get } from 'common/func.utils'

export const getVersions = async () => {
  try {
    return (await RestClient.get('/tracking/version')).data
  } catch (error) {
    throw get(error, ['response', 'data', 'message'], error.message)
  }
}
