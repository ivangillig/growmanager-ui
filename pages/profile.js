import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Breadcrumb, Button, Input, Row, Col, Form } from 'antd'
import { useTranslation } from 'next-i18next'
import AppRoot from '../src/hoc/AppRoot'
import { updateUser } from '@/src/features/user/userActions'
import PasswordChangeModal from '@/components/Common/PasswordChangeModal'

function ProfilePage() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.user || {})
  const [form] = Form.useForm()
  const [isPasswordChangeModalVisible, setPasswordChangeModalVisible] =
    useState(false)

  useEffect(() => {
    form.setFieldsValue({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    })
  }, [user, form])

  const handleSaveChanges = (values) => {
    dispatch(
      updateUser({ firstName: values.firstName, lastName: values.lastName })
    )
  }

  const handleOpenPasswordChangeModal = () => {
    setPasswordChangeModalVisible(true)
  }

  const handleClosePasswordChangeModal = () => {
    setPasswordChangeModalVisible(false)
  }

  return (
    <AppRoot>
      <Row className="header" gutter={[16, 16]}>
        <Col xs={24} sm={12}>
          <Breadcrumb>
            <Breadcrumb.Item>{t('Home')}</Breadcrumb.Item>
            <Breadcrumb.Item>{t('Profile')}</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>
      <Row className="content" gutter={[16, 16]}>
        <Col span={8}>
          <Form form={form} layout="vertical" onFinish={handleSaveChanges}>
            <Form.Item label={t('username')} name="username">
              <Input disabled />
            </Form.Item>
            <Form.Item label={t('Email')} name="email">
              <Input type="email" disabled />
            </Form.Item>
            <Form.Item
              label={t('firstName')}
              name="firstName"
              rules={[
                { required: true, message: t('Please enter your first name') },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label={t('lastName')}
              name="lastName"
              rules={[
                { required: true, message: t('Please enter your last name') },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <Button onClick={handleOpenPasswordChangeModal}>
                {t('Change Password')}
              </Button>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                {t('Save Changes')}
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
      <PasswordChangeModal
        visible={isPasswordChangeModalVisible}
        onCancel={handleClosePasswordChangeModal}
      />
    </AppRoot>
  )
}

export default ProfilePage
