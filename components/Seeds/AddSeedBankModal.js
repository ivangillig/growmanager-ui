import React from 'react'
import { Modal, Form, Input } from 'antd'
import { useTranslation } from 'next-i18next'

const AddSeedBankModal = ({ visible, onCancel }) => {
  const { t } = useTranslation()
  const [form] = Form.useForm()

  const handleOk = () => {
    form.validateFields().then((values) => {
      console.log('Seed Bank Data:', values) // Aquí puedes manejar el envío de datos
      form.resetFields()
      onCancel()
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
          rules={[{ required: true, message: t('Please input the phone number') }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default AddSeedBankModal