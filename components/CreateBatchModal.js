import { getSeeds } from '@/src/features/seed/seedActions'
import { Modal, Form, Input, DatePicker, Select, Switch, Button } from 'antd'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'next-i18next'

const { Option } = Select

const BatchModal = ({ visible, onCancel, onAddBatch }) => {
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const seeds = useSelector((state) => state.seed.seeds || [])

  useEffect(() => {
    if (seeds.length === 0) {
      dispatch(getSeeds())
    }
  }, [dispatch, seeds])

  const handleOk = () => {
    form.validateFields().then((values) => {
      onAddBatch(values)
      form.resetFields()
    })
  }

  return (
    <Modal
      title={t('Add Batch')}
      open={visible}
      onCancel={onCancel}
      footer={[
        <Button key="submit" type="primary" onClick={handleOk}>
          {t('Submit')}
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="seedId"
          label={t('Genetic')}
          rules={[{ required: true }]}
        >
          <Select>
            {seeds.map((seed) => (
              <Option key={seed._id} value={seed._id}>
                {`${seed.seedBank} - ${seed.genetic}`}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="germinationDate"
          label={t('Germination Date')}
          rules={[{ required: true }]}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          name="is_cutting"
          label={t('Is Cutting')}
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default BatchModal
