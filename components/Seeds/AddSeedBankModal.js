import React from 'react'
import { Modal, Form, Input } from 'antd'
import { useTranslation } from 'next-i18next'
import { useDispatch } from 'react-redux'
import { addSeedBankRequest } from '@/src/features/seed/seedActions'
import { getSeedBanks } from '@/src/features/seedBank/seedBankActions'

const AddSeedBankModal = ({ visible, onCancel }) => {
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const dispatch = useDispatch()

  const handleOk = () => {
    form.validateFields().then((values) => {
      dispatch(addSeedBankRequest(values)) 
      form.resetFields()
      onCancel()
      dispatch(getSeedBanks())
    })
  }

  return (
    <Modal
      open={visible}
      title={t('Add Seed Bank')}
      onCancel={onCancel}
      onOk={handleOk}
      okText={t('Save')}
      cancelText={t('Cancel')}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label={t('Seed Bank Name')}
          rules={[{ required: true, message: t('Please input the seed bank name') }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label={t('Email')}
          rules={[{ required: true, type: 'email', message: t('Please input a valid email') }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="phone"
          label={t('Phone')}
          rules={[{ required: true, message: t('Please input the phone number'), pattern: /^\d+$/ }]}
        >
          {/* <Input onKeyPress={(e) => { if (!/\d/.test(e.key)) e.preventDefault(); }} /> */}
          <Input type='number' min={0} />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default AddSeedBankModal