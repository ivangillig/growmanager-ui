import { Layout, Button } from 'antd'
import {
  LogoutOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'

const { Header } = Layout

export default function CustomHeader({ collapsed, setCollapsed }) {
  const { t } = useTranslation()

  return (
    <Header className="custom-header">
      <div className="header-left">
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{
            fontSize: '20px',
            width: 64,
            height: 64,
          }}
        />
        <div className="header-logo">
          <Image
            src="/images/logo.png"
            alt="GrowManager Logo"
            width={40}
            height={40}
          />
          <span className="logo-text">GrowManager</span>
        </div>
      </div>
      <Button
        type="primary"
        className="logout-button"
        icon={<LogoutOutlined />}
      >
        {t('Logout')}
      </Button>
    </Header>
  )
}
