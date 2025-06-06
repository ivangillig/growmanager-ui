import { Form, Input, Button, Typography } from 'antd'
import { useDispatch } from 'react-redux'
import Image from 'next/image'
import { loginRequest } from '../src/features/auth/authActions'
import { useTranslation } from 'next-i18next'
import { FaRegUserCircle } from 'react-icons/fa'
import { RiLockPasswordLine } from 'react-icons/ri'
import redirectByRole from '../src/hoc/redirectByRole'
import { ROLES } from '../src/constants/Roles'
const { Title } = Typography

const Login = (props) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

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
            <Input prefix={<FaRegUserCircle />} placeholder={t('Username')} />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: t('Please input your password!') },
            ]}
          >
            <Input.Password
              prefix={<RiLockPasswordLine />}
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

// Login.getLayout = (page) => <>{page}</>

export default redirectByRole(Login, [ROLES.UNAUTHENTICATED])
