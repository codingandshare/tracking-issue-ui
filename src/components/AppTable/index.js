import React, { useMemo } from 'react'
import { Table } from 'antd'

const AppTable = ({ tableData, onChangeTable }) => {
  console.log('render AppTable')

  const pagination = useMemo(() => {
    return { ...tableData.pagination, position: ['bottomCenter'] }
  }, [tableData.pagination])

  return (
    <Table
      columns={tableData.columns}
      rowKey={(record) => record.id}
      loading={tableData.loading}
      onChange={onChangeTable}
      pagination={pagination}
      dataSource={tableData.data}
    />
  )
}

export default React.memo(AppTable)
