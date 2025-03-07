import { Layout, Button } from 'antd'
import { LogoutOutlined } from '@ant-design/icons'
import Image from 'next/image'

const { Header } = Layout

export default function CustomHeader() {
  return (
    <Header className="custom-header">
      <div className="logo">
        <Image
          src="/images/logo.png"
          alt="GrowManager Logo"
          width={40}
          height={40}
        />
        <span className="logo-text">GrowManager</span>
      </div>
      <Button
        type="primary"
        className="logout-button"
        icon={<LogoutOutlined />}
      >
        Logout
      </Button>
    </Header>
  )
}
