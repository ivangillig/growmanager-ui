import { getSeeds } from '@/src/features/seed/seedActions'
import { Modal, Form, Input, DatePicker, Select } from 'antd'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

const { Option } = Select

const AddBatchModal = ({ visible, onCancel, onAddBatch }) => {
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
    <Modal title="Add Batch" open={visible} onCancel={onCancel} onOk={handleOk}>
      <Form form={form} layout="vertical">
        <Form.Item
          name="production_date"
          label="Production Date"
          rules={[{ required: true }]}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name="seedId" label="Genetic" rules={[{ required: true }]}>
          <Select>
            {seeds.map((seed) => (
              <Option key={seed._id} value={seed.id}>
                {`${seed.seedBank} - ${seed.genetic}`}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="thc" label="THC (%)" rules={[{ required: true }]}>
          <Input type="number" />
        </Form.Item>
        <Form.Item name="cbd" label="CBD (%)" rules={[{ required: true }]}>
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="drying_time"
          label="Drying Time"
          rules={[{ required: true }]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="quantity_produced"
          label="Quantity Produced (g)"
          rules={[{ required: true }]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item name="rav" label="RAV" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default AddBatchModal
