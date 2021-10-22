import React from 'react'
import { Row, Col } from 'antd'
import TrackingFilter from 'components/TrackingFilter'
import TrackingHook from './hook'
import AppTable from 'components/AppTable'
import HistoryModal from 'components/HistoryModal'
import { useTranslation } from 'react-i18next'
import './styles'

const Tracking = () => {
  const { t } = useTranslation()
  const {
    onFilter,
    onAdd,
    version,
    metaData,
    trackingData,
    onChangeTable,
    onCloseHistoryModal,
    isShowHistoryModal,
    histories
  } = TrackingHook()

  console.log('Render page tracking')
  return (
    <Row gutter={24} id="tracking-list-page">
      <Col span={24}>
        <TrackingFilter onAdd={onAdd} title={version?.version} onFilter={onFilter} filterData={metaData} />
      </Col>
      <Col span={24}>
        <div className="lb-total">
          <strong>{t('Total issues')}:</strong>&nbsp;&nbsp;{trackingData.pagination.total}
        </div>
      </Col>
      <Col span={24}>
        <AppTable tableData={trackingData} onChangeTable={onChangeTable} />
      </Col>
      <HistoryModal histories={histories} isVisible={isShowHistoryModal} onClose={onCloseHistoryModal} />
    </Row>
  )
}

export default Tracking
