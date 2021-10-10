import RestClient from './rest-client'
import { getToken } from './storage.service'
import { get, isNil } from 'common/func.utils'

export const isSignIned = () => {
  return !isNil(getToken())
}

export const login = async (loginData) => {
  try {
    return (await RestClient.post('/auth/login', loginData)).data
  } catch (error) {
    throw get(error, ['response', 'data', 'message'], error.message)
  }
}
