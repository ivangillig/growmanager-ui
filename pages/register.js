import { Form, Input, Button, Typography, Tooltip } from 'antd'
import { useDispatch } from 'react-redux'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'
import { registerRequest } from '../src/features/auth/authActions'
import { FaRegUserCircle } from 'react-icons/fa'
import { RiLockPasswordLine } from 'react-icons/ri'
import redirectByRole from '../src/hoc/redirectByRole'
import { ROLES } from '../src/constants/Roles'
const { Title } = Typography

const Register = (props) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const handleSubmit = (values) => {
    console.log('casi se despacho')
    if (values.password !== values.confirmPassword) {
      return alert(t('Passwords do not match!'))
    }
    console.log('se despacho')
    dispatch(registerRequest(values))
  }

  return (
    <div className={'container'}>
      <div className={'registerBox'}>
        <div className={'logo'}>
          <Image
            src="/images/logo.png"
            alt="GrowManager Logo"
            width={124}
            height={124}
          />
        </div>
        <Title level={2} className={'appTitle'}>
          {t('Register')}
        </Title>
        <Form
          name="register"
          onFinish={handleSubmit}
          layout="vertical"
          size="large"
          autoComplete="off"
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
            {/* <Tooltip
              title={t(
                'Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character.'
              )}
            > */}
            <Input.Password
              prefix={<RiLockPasswordLine />}
              placeholder={t('Password')}
            />
            {/* </Tooltip> */}
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            dependencies={['password']}
            hasFeedback
            rules={[
              { required: true, message: t('Please confirm your password!') },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error(t('Passwords do not match!')))
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<RiLockPasswordLine />}
              placeholder={t('Confirm Password')}
            />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: t('Please input your email!') },
              { type: 'email', message: t('Please enter a valid email!') },
            ]}
          >
            <Input placeholder={t('Email')} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              {t('Sign Up')}
            </Button>
          </Form.Item>
        </Form>
        <div className={'links'}>
          <Button type="link" href="/">
            {t('Already have an account? Sign In')}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default redirectByRole(Register, [ROLES.UNAUTHENTICATED])
