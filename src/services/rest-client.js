import axios from 'axios/lib/axios'
import { getToken, clearLogin } from './storage.service'
import { isNil, get } from 'common/func.utils'

const RestClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 10000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

RestClient.interceptors.request.use((request) => {
  const token = getToken()
  if (!isNil(token)) {
    request.headers['Authorization'] = `Bearer ${token}`
  }
  return request
})

export default RestClient
