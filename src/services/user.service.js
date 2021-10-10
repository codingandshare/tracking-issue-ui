import RestClient from './rest-client'

export const getUserInfo = async () => {
  try {
    return (await RestClient.get('/tracking/user/info')).data
  } catch (error) {
    throw get(error, ['response', 'data', 'message'], error.message)
  }
}
