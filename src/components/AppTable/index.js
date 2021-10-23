import React, { useMemo } from 'react'
import { Table } from 'antd'

const AppTable = ({ tableData, onChangeTable }) => {
  console.log('render AppTable')

  const pagination = useMemo(() => {
    return tableData.pagination ? { ...tableData.pagination, position: ['bottomCenter'] } : false
  }, [tableData.pagination])

  const columns = useMemo(() => {
    return tableData.columns
  }, [tableData.columns])

  return (
    <Table
      columns={columns}
      rowKey={(record) => record.id}
      loading={tableData.loading}
      onChange={onChangeTable}
      pagination={pagination}
      dataSource={tableData.data}
    />
  )
}

export default React.memo(AppTable)
