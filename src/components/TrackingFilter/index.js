import React, { useMemo } from 'react'
import { Collapse, Button, Form, Input, Row, Col, Select } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import issueStatuses from 'common/issue-status.const'
import { map, filter } from 'common/func.utils'
const { Panel } = Collapse

const ButtonAdd = (props) => {
  return (
    <Button type="primary" size={'small'} icon={<PlusOutlined />} onClick={props.onClick}>
      {props.t('New issue')}
    </Button>
  )
}

const ALL_OBJ = {
  name: 'All',
  value: null
}

const TrackingFilter = (props) => {
  const { onFilter, title, onAdd, filterData } = props
  const { t } = useTranslation()
  const [form] = Form.useForm()

  const metaData = useMemo(() => {
    const data = {
      users: [ALL_OBJ],
      severities: [ALL_OBJ],
      priorities: [ALL_OBJ]
    }
    if (filterData.users) {
      data.users = data.users.concat(
        map(filterData.users, (it) => {
          return { name: `${it.firstName} ${it.lastName}`, value: it.id }
        })
      )
    }
    if (filterData.metas) {
      data.severities = data.severities.concat(filter(filterData.metas, (it) => it.type === 'SEVERITY'))
      data.priorities = data.priorities.concat(filter(filterData.metas, (it) => it.type === 'PRIORITY'))
    }

    return data
  }, [filterData.users])

  const onReset = () => {
    form.resetFields()
  }

  console.log('render TrackingFilter')
  return (
    <Collapse accordion>
      <Panel header={title} extra={<ButtonAdd onClick={onAdd} t={t} />}>
        <Form
          layout={'vertical'}
          initialValues={{
            status: null,
            fixer: null,
            reporter: null,
            priority: null,
            severity: null
          }}
          form={form}
          name="tracking-filter-form"
          onFinish={onFilter}
        >
          <Row gutter={24}>
            <Col span={8}>
              <Form.Item name="ticket" label={t('Ticket')}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="shortDescription" label={t('Short description')}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="status" label={t('Status')}>
                <Select>
                  {map(issueStatuses, (it, index) => {
                    return (
                      <Select.Option key={index} value={it.value}>
                        {it.name}
                      </Select.Option>
                    )
                  })}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="severity" label={t('Severity')}>
                <Select>
                  {map(metaData.severities, (it, index) => {
                    return (
                      <Select.Option key={index} value={it.value}>
                        {it.name}
                      </Select.Option>
                    )
                  })}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="priority" label={t('Priority')}>
                <Select>
                  {map(metaData.priorities, (it, index) => {
                    return (
                      <Select.Option key={index} value={it.value}>
                        {it.name}
                      </Select.Option>
                    )
                  })}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="reporter" label={t('Reporter')}>
                <Select>
                  {map(metaData.users, (it, index) => {
                    return (
                      <Select.Option key={index} value={it.value}>
                        {it.name}
                      </Select.Option>
                    )
                  })}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="fixer" label={t('Fixer')}>
                <Select>
                  {map(metaData.users, (it, index) => {
                    return (
                      <Select.Option key={`fixer-${index}`} value={it.value}>
                        {it.name}
                      </Select.Option>
                    )
                  })}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8} style={{ marginTop: 30 }}>
              <Button style={{ marginRight: 10 }} onClick={onReset}>
                {t('Reset')}
              </Button>
              <Button type="primary" htmlType="submit">
                {t('Filter')}
              </Button>
            </Col>
          </Row>
        </Form>
      </Panel>
    </Collapse>
  )
}

export default React.memo(TrackingFilter)
