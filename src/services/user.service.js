import RestClient from './rest-client'
import { get } from 'common/func.utils'

export const getUserInfo = async () => {
  try {
    return (await RestClient.get('/tracking/user/info')).data
  } catch (error) {
    throw get(error, ['response', 'data', 'message'], error.message)
  }
}

export const updateUser = async (user) => {
  try {
    return (await RestClient.put('/tracking/user', user)).data
  } catch (error) {
    throw get(error, ['response', 'data', 'message'], error.message)
  }
}

export const changePassword = async (pass) => {
  try {
    return (await RestClient.put('/tracking/user/changePassword', pass)).data
  } catch (error) {
    throw get(error, ['response', 'data', 'message'], error.message)
  }
}
