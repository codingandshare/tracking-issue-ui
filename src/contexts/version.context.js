import { find } from 'common/func.utils'
import { showError } from 'common/notify.utils'
import { useState, useCallback } from 'react'
import { getVersion, storeVersion } from 'services/storage.service'
import { getVersions } from 'services/version.service'

const VersionContext = () => {
  const [isShowVersionModal, setIsShowVersionModal] = useState(false)
  const [versions, setVersions] = useState([])
  const [version, setVersion] = useState(getVersion())

  const onSelectVersion = useCallback((formData) => {
    setIsShowVersionModal(false)
    const ver = find(versions, (it) => it.id === formData.version)
    storeVersion(ver)
    setVersion(ver)
  }, [])

  const loadVersionModal = useCallback(() => {
    const ver = getVersion()
    if (!ver) {
      showVersionModal()
    }
  }, [getVersion])

  const showVersionModal = useCallback(() => {
    setIsShowVersionModal(true)
    getVersions()
      .then((res) => {
        setVersions(res)
      })
      .catch(showError)
  }, [])

  return {
    setIsShowVersionModal,
    isShowVersionModal,
    version,
    versions,
    onSelectVersion,
    showVersionModal,
    loadVersionModal
  }
}

export default VersionContext
