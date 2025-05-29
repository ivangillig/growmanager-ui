import { getSeeds } from '@/src/features/seed/seedActions'
import { Modal, Form, DatePicker, Select, Switch, Button } from 'antd'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'next-i18next'
import BasicSeedCard from '../Seeds/BasicSeedCard'

const { Option } = Select

const BatchModal = ({ visible, onCancel, onAddBatch }) => {
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const seeds = useSelector((state) => state.seed.seeds || [])
  const [selectedSeed, setSelectedSeed] = useState(null)

  useEffect(() => {
      dispatch(getSeeds())
  }, [dispatch])

  const handleOk = () => {
    form.validateFields().then((values) => {
      onAddBatch(values)
      form.resetFields()
      setSelectedSeed(null)
    })
  }

  const handleSeedChange = (value) => {
    const seed = seeds.find((seed) => seed._id === value)
    setSelectedSeed(seed)
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
          <Select
            placeholder={t('Select a genetic')}
            onChange={handleSeedChange}
          >
            {seeds && seeds.map((seed) => (
              <Option key={seed._id} value={seed._id}>
                {`${seed.seedBank} - ${seed.genetic}`}
              </Option>
            ))}
          </Select>
          
        </Form.Item>
        {selectedSeed && <BasicSeedCard seed={selectedSeed} />}
        <Form.Item
          name="germinationDate"
          label={t('Germination Date')}
          rules={[{ required: true }]}
        >
          <DatePicker
            style={{ width: '100%' }}
            placeholder={t('Select date')}
          />
        </Form.Item>
        <Form.Item
          layout="horizontal"
          name="isCutting"
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
