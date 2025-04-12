import { Form, Input, Button, Typography } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { registerOrganizationRequest } from '../src/features/organization/organizationActions'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'

const { Title } = Typography

const RegisterOrganization = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const router = useRouter()
  const registerSuccess = useSelector(
    (state) => state.organization.registerSuccess
  )

  useEffect(() => {
    if (registerSuccess) {
      router.push('/dashboard')
    }
  }, [registerSuccess, router])

  const handleSubmit = (values) => {
    dispatch(registerOrganizationRequest(values))
  }

  return (
    <div className={'container'}>
      <div className={'registerBox'}>
        <div className={'logo'}>
          <Image src="/images/logo.png" alt="GrowManager Logo" width={150} height={150} />
        </div>
        <Title level={2} className={'appTitle'}>
          {t('New Organization')}
        </Title>
        <Form
          name="registerOrganization"
          onFinish={handleSubmit}
          layout="vertical"
          size="large"
        >
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: t('Please input the organization name!'),
              },
            ]}
          >
            <Input placeholder={t('Organization Name')} />
          </Form.Item>
          <Form.Item name="description">
            <Input.TextArea placeholder={t('Description (optional)')} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              {t('Create')}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

RegisterOrganization.getLayout = (page) => <>{page}</>

export default RegisterOrganization
