import { useMemo, useState, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { PAGE_SIZE } from 'common/app.const'
import { fetchUsers } from 'services/user.service'
import { showError } from 'common/notify.utils'

const UserHook = () => {
  const { t } = useTranslation()

  const columns = useMemo(() => {
    return [
      {
        title: t('Username'),
        dataIndex: 'username',
        key: 'username',
        sorter: true
      },
      {
        title: t('First name'),
        dataIndex: 'firstName',
        key: 'firstName',
        sorter: true
      },
      {
        title: t('Last name'),
        dataIndex: 'lastName',
        key: 'lastName',
        sorter: true
      },
      {
        title: t('Email'),
        dataIndex: 'email',
        key: 'email',
        sorter: true
      },
      {
        title: t('Status'),
        dataIndex: 'status',
        key: 'status',
        sorter: true
      }
    ]
  }, [t])

  const [userData, setUserData] = useState({
    columns: columns,
    data: [],
    pagination: {
      current: 1,
      pageSize: PAGE_SIZE,
      total: 0
    },
    loading: true
  })

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
    sort: 'username,desc'
  })

  useEffect(() => {
    const params = {
      size: pagination.pageSize,
      page: pagination.current - 1,
      sort: pagination.sort
    }
    if (!userData.loading) {
      setUserData({ ...userData, loading: true })
    }
    fetchUsers(params)
      .then((res) => {
        const resData = {
          ...userData,
          pagination: { ...userData.pagination, current: pagination.current, total: res.total, sort: pagination.sort },
          data: res.content,
          loading: false
        }
        setUserData(resData)
      })
      .catch(showError)
  }, [pagination])

  const onChangeTable = useCallback((paginationEvt, filters, sortEvt) => {
    const sort = sortEvt.order ? `${sortEvt.field},${sortEvt.order === 'descend' ? 'desc' : 'asc'}` : null
    setPagination({ ...pagination, sort, current: paginationEvt.current })
  }, [])

  return {
    userData,
    onChangeTable,
    t
  }
}

export default UserHook
