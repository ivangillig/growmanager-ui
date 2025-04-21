import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Breadcrumb, Button, Input, Row, Col, Form } from 'antd'
import { useTranslation } from 'next-i18next'
import AppRoot from '../src/hoc/AppRoot'

function ProfilePage() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.user || {})
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({
      name: user.name,
      email: user.email,
    })
  }, [user, form])

  const handleSaveChanges = (values) => {
    console.log('Saved values:', values)
    // Dispatch an action to save changes (to be implemented later)
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
            <Form.Item
              label={t('Name')}
              name="name"
              rules={[{ required: true, message: t('Please enter your name') }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label={t('Email')}
              name="email"
              rules={[
                { required: true, message: t('Please enter your email') },
              ]}
            >
              <Input type="email" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                {t('Save Changes')}
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </AppRoot>
  )
}

export default ProfilePage
