import { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useHistory } from 'react-router'
import { AppContext } from 'contexts/app.context'
import { useTranslation } from 'react-i18next'
import { fetchIssueHistories, fetchIssues } from 'services/tracking.service'
import { forEach } from 'common/func.utils'
import { showError } from 'common/notify.utils'
import { PAGE_SIZE } from 'common/app.const'
import moment from 'moment'
import { Button } from 'antd'

const TrackingHook = () => {
  const history = useHistory()
  const { version, metaData } = useContext(AppContext)
  const { t } = useTranslation()

  const columns = useMemo(() => {
    return [
      {
        title: t('Ticket'),
        dataIndex: 'ticket',
        key: 'ticket',
        width: '10%',
        sorter: true
      },
      {
        title: t('Short description'),
        dataIndex: 'shortDescription',
        key: 'shortDescription',
        width: '15%',
        sorter: true
      },
      {
        title: t('Severity'),
        dataIndex: 'severity',
        key: 'severity',
        width: '10%',
        sorter: true
      },
      {
        title: t('Priority'),
        dataIndex: 'priority',
        key: 'priority',
        width: '10%',
        sorter: true
      },
      {
        title: t('Status'),
        dataIndex: 'status',
        key: 'status',
        width: '10%',
        sorter: true
      },
      {
        title: t('Reporter'),
        dataIndex: 'fullNameReporter',
        key: 'fullNameReporter',
        width: '10%',
        sorter: true
      },
      {
        title: t('Fixer'),
        dataIndex: 'fullNameFixer',
        key: 'fullNameFixer',
        width: '10%',
        sorter: true
      },
      {
        title: t('Last modified'),
        dataIndex: 'modifiedTime',
        key: 'modifiedTime',
        width: '10%',
        sorter: true,
        defaultSortOrder: 'descend',
        render: (col) => {
          return moment(col).local().fromNow()
        }
      },
      {
        title: t('Actions'),
        key: 'actionkey',
        width: '10%',
        sorter: false,
        render: (col, colData) => {
          return (
            <Button onClick={() => onShowHistoryModal(colData.id)} size={'small'}>
              {t('History')}
            </Button>
          )
        }
      }
    ]
  }, [t])

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
    sort: 'modifiedTime,desc',
    filterData: null
  })

  const [trackingData, setTrackingData] = useState({
    columns: columns,
    data: [],
    pagination: {
      current: 1,
      pageSize: PAGE_SIZE,
      total: 0
    },
    loading: false
  })

  const [isShowHistoryModal, setIsShowHistoryModal] = useState(false)
  const [histories, setHistories] = useState([])

  const loadIssues = useCallback(() => {
    const params = {
      page: pagination.current - 1,
      size: pagination.pageSize,
      versionId: version.id,
      sort: pagination.sort
    }
    if (pagination.filterData) {
      const keys = Object.keys(pagination.filterData)
      forEach(keys, (it) => {
        params[it] = pagination.filterData[it]
      })
    }
    setTrackingData({ ...trackingData, loading: true })
    fetchIssues(params)
      .then((res) => {
        const pag = pagination
        pag.total = res.total
        setTrackingData({ ...trackingData, pagination: pag, data: res.content, loading: false })
      })
      .catch((error) => {
        showError(error)
        setTrackingData({ ...trackingData, loading: false })
      })
  }, [pagination, version])

  const onFilter = useCallback((filterData) => {
    setPagination({ ...pagination, filterData })
  }, [])

  const onAdd = useCallback(
    (e) => {
      e.stopPropagation()
      history.push('/app/tracking/add')
    },
    [history]
  )

  const onChangeTable = useCallback((paginationEvt, filters, sortEvt) => {
    const sort = sortEvt.order ? `${sortEvt.field},${sortEvt.order === 'descend' ? 'desc' : 'asc'}` : null
    setPagination({ ...pagination, sort, current: paginationEvt.current })
  }, [])

  useEffect(() => {
    if (version) {
      loadIssues()
    }
  }, [pagination, version])

  const onCloseHistoryModal = useCallback(() => {
    setIsShowHistoryModal(false)
  }, [])

  const onShowHistoryModal = useCallback((issueId) => {
    setIsShowHistoryModal(true)
    setHistories([])
    fetchIssueHistories(issueId)
      .then((res) => {
        setHistories(res)
      })
      .catch(showError)
  }, [])

  return {
    onFilter,
    onAdd,
    version,
    metaData,
    trackingData,
    onChangeTable,
    onCloseHistoryModal,
    isShowHistoryModal,
    histories
  }
}

export default TrackingHook
