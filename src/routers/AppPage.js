import React from 'react'
import { useTranslation } from 'react-i18next'

const AppPage = () => {
  const { t } = useTranslation()
  return <div>{t('name')}</div>
}

export default AppPage
