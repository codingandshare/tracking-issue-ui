const TOKEN_KEY = 'token'
const VERSION_KEY = 'version'

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY)
}

export const clearLogin = () => {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(VERSION_KEY)
}

export const setToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token)
}

export const storeVersion = (version) => {
  localStorage.setItem(VERSION_KEY, JSON.stringify(version))
}

export const getVersion = () => {
  const jsonVersion = localStorage.getItem(VERSION_KEY)
  return jsonVersion ? JSON.parse(localStorage.getItem(VERSION_KEY)) : null
}
