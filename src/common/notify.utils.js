import { notification } from 'antd'

export const showError = (msg, description) => {
  notification['error']({
    message: msg,
    description,
    placement: 'topRight',
    duration: 5
  })
}

export const showWarning = (msg, description) => {
  notification['warning']({
    message: msg,
    description,
    placement: 'topRight',
    duration: 5
  })
}

export const showSuccess = (msg, description) => {
  notification['success']({
    message: msg,
    description,
    placement: 'topRight',
    duration: 5
  })
}
