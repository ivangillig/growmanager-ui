import { Layout, Button } from 'antd'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'
import {
  RiMenuFold3Fill,
  RiMenuFold4Fill,
  RiLogoutBoxRLine,
} from 'react-icons/ri'

const { Header } = Layout

export default function CustomHeader({ collapsed, setCollapsed }) {
  const { t } = useTranslation()

  return (
    <Header className="custom-header">
      <div className="header-left">
        <Button
          type="text"
          icon={collapsed ? <RiMenuFold4Fill /> : <RiMenuFold3Fill />}
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
        icon={<RiLogoutBoxRLine />}
      >
        {t('Logout')}
      </Button>
    </Header>
  )
}
