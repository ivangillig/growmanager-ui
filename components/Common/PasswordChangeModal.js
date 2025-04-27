import React from 'react'
import { Modal, Form, Input, Button } from 'antd'
import { useTranslation } from 'next-i18next'
import { useDispatch } from 'react-redux'
import { updatePassword } from '@/src/features/user/userActions'

const PasswordChangeModal = ({ visible, onCancel }) => {
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const dispatch = useDispatch()

  const handleFinish = (values) => {
    const { currentPassword, newPassword } = values
    dispatch(updatePassword({ currentPassword, newPassword }))
    form.resetFields()
    onCancel()
  }

  return (
    <Modal
      title={t('Change Password')}
      open={visible}
      onCancel={onCancel}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item
          label={t('Current Password')}
          name="currentPassword"
          rules={[
            {
              required: true,
              message: t('Please enter your current password'),
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label={t('New Password')}
          name="newPassword"
          rules={[
            { required: true, message: t('Please enter your new password') },
            {
              pattern:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/,
              message: t(
                'Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character.'
              ),
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label={t('Confirm New Password')}
          name="confirmNewPassword"
          dependencies={['newPassword']}
          hasFeedback
          rules={[
            { required: true, message: t('Please confirm your new password!') },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error(t('Passwords do not match!')))
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            {t('Change Password')}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default PasswordChangeModal
