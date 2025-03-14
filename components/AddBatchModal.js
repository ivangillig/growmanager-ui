import React from 'react'
import { getSeeds } from '@/src/features/seed/seedActions'
import { Modal, Form, Input, DatePicker, Select } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'next-i18next'

const { Option } = Select

const AddBatchModal = ({ visible, onCancel, onAddBatch }) => {
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const seeds = useSelector((state) => state.seed.seeds || [])

  React.useEffect(() => {
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
      open={visible}
      title={t('Add Batch')}
      onCancel={onCancel}
      onOk={handleOk}
      okText={t('Add batch')}
      cancelText={t('Cancel')}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="productionDate"
          label={t('Production Date')}
          rules={[
            {
              required: true,
              message: t('Please select the production date'),
            },
          ]}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          name="seedId"
          label={t('Genetic')}
          rules={[{ required: true, message: t('Please select the genetic') }]}
        >
          <Select>
            {seeds.map((seed) => (
              <Option key={seed._id} value={seed.id}>
                {`${seed.seedBank} - ${seed.genetic}`}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="thc"
          label={t('THC (%)')}
          rules={[
            { required: true, message: t('Please input the THC percentage') },
          ]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="cbd"
          label={t('CBD (%)')}
          rules={[
            { required: true, message: t('Please input the CBD percentage') },
          ]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="drying_time"
          label={t('Drying Time')}
          rules={[
            { required: true, message: t('Please input the drying time') },
          ]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="quantity_produced"
          label={t('Quantity Produced (g)')}
          rules={[
            {
              required: true,
              message: t('Please input the quantity produced'),
            },
          ]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="rav"
          label={t('RAV')}
          rules={[{ required: true, message: t('Please input the RAV') }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default AddBatchModal
