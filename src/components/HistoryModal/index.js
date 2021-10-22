import React, { useContext, useMemo } from 'react'
import { Modal } from 'antd'
import { useTranslation } from 'react-i18next'
import AppTable from 'components/AppTable'
import moment from 'moment'
import { AppContext } from 'contexts/app.context'
import { find } from 'common/func.utils'

const HistoryModal = (props) => {
  const { metaData } = useContext(AppContext)
  const { isVisible, onClose, histories } = props
  const { t } = useTranslation()

  const columns = useMemo(() => {
    return [
      {
        title: t('Status'),
        dataIndex: 'status',
        key: 'status'
      },
      {
        title: t('Changed'),
        dataIndex: 'changedNote',
        key: 'changedNote'
      },
      {
        title: t('Created by'),
        dataIndex: 'createdBy',
        key: 'createdBy',
        render: (col) => {
          const user = find(metaData.users, (it) => it.id === col)
          return user ? `${user.firstName} ${user.lastName}` : 'N/A'
        }
      },
      {
        title: t('Modified by'),
        dataIndex: 'modifiedBy',
        key: 'modifiedBy',
        render: (col) => {
          const user = find(metaData.users, (it) => it.id === col)
          return user ? `${user.firstName} ${user.lastName}` : 'N/A'
        }
      },
      {
        title: t('Created date'),
        dataIndex: 'createdTime',
        key: 'createdTime',
        render: (col) => {
          return moment(col).local().fromNow()
        }
      },
      {
        title: t('Modified date'),
        dataIndex: 'modifiedTime',
        key: 'modifiedTime',
        render: (col) => {
          return moment(col).local().fromNow()
        }
      }
    ]
  }, [t])

  const historyData = useMemo(() => {
    const isLoading = !histories || histories.length === 0
    return {
      columns: columns,
      data: histories,
      pagination: null,
      loading: isLoading,
      title: isLoading ? '' : histories[0].ticket
    }
  }, [histories])

  console.log('render history modal')
  return (
    <Modal
      title={`${t('History for')} ${historyData.title}`}
      visible={isVisible}
      onCancel={onClose}
      footer={null}
      width={850}
    >
      <AppTable tableData={historyData} />
    </Modal>
  )
}

export default React.memo(HistoryModal)
