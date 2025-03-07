import { Layout, Button } from 'antd'
import {
  LogoutOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons'
import Image from 'next/image'

const { Header } = Layout

export default function CustomHeader({ collapsed, setCollapsed }) {
  return (
    <Header className="custom-header">
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        style={{
          fontSize: '16px',
          width: 64,
          height: 64,
        }}
      />
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
