import { Form, Input, Button, Typography } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import Image from 'next/image'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { loginRequest } from '../src/features/auth/authActions'
import { useTranslation } from 'next-i18next'

const { Title } = Typography

const Login = (props) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const router = useRouter()
  const loginSuccess = useSelector((state) => state.auth.loginSuccess)

  useEffect(() => {
    if (loginSuccess) {
      router.push('/dashboard')
    }
  }, [loginSuccess, router])

  const handleSubmit = (values) => {
    dispatch(loginRequest(values))
  }

  return (
    <div className={'container'}>
      <div className={'loginBox'}>
        <div className={'logo'}>
          <Image
            src="/images/logo.png"
            alt="GrowManager Logo"
            width={124}
            height={124}
          />
        </div>
        <Title level={2} className={'appTitle'}>
          {process.env.NEXT_PUBLIC_APP_TITLE}
        </Title>
        <Form
          name="login"
          onFinish={handleSubmit}
          layout="vertical"
          size="large"
        >
          <Form.Item
            name="username"
            rules={[
              { required: true, message: t('Please input your username!') },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder={t('Username')} />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: t('Please input your password!') },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder={t('Password')}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              {t('Sign In')}
            </Button>
          </Form.Item>
        </Form>
        <div className={'links'}>
          <Button type="link" href="/register">
            {t('Create account')}
          </Button>
          <Button type="link" href="/forgot-password">
            {t('Forgot password?')}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Login
