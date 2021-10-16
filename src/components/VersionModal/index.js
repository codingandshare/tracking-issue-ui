import React, { useEffect } from 'react'
import { Modal, Form, Select, Button } from 'antd'
import { useTranslation } from 'react-i18next'
import { isNil, map } from 'common/func.utils'

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 }
}

const VersionModal = (props) => {
  const { isShow, versions, onClose, onSelect, version } = props
  const { t } = useTranslation()
  const [form] = Form.useForm()

  useEffect(() => {
    if (version && version.id) {
      form.setFieldsValue({ version: version.id })
    }
  }, [version, isShow])

  return (
    <Modal
      title={t('Select version')}
      visible={isShow}
      onCancel={onClose}
      maskClosable={false}
      closable={!isNil(version)}
      footer={[
        !isNil(version) && (
          <Button key={`btn_cancel_version`} onClick={onClose}>
            {t('Cancel')}
          </Button>
        ),
        <Button key={`select-version`} type={'primary'} form="version-form" htmlType="submit">
          {t('Select')}
        </Button>
      ]}
    >
      <Form form={form} {...layout} name="version-form" onFinish={onSelect}>
        <Form.Item
          hasFeedback
          name="version"
          label={t('Version')}
          rules={[{ required: true, message: t('Please select version') }]}
        >
          <Select>
            {map(versions, (it, index) => {
              return (
                <Select.Option key={index} value={it.id}>
                  {it.version}
                </Select.Option>
              )
            })}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default VersionModal
