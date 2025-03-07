import { Layout, Menu } from 'antd'
import { useRouter } from 'next/router'
import CustomHeader from './Header'
import CustomContent from './Content'
import { useState } from 'react'
import {
  UserOutlined,
  DashboardOutlined,
  SettingOutlined,
  ShoppingOutlined,
} from '@ant-design/icons'

const { Footer, Sider } = Layout

export default function MainLayout({ children }) {
  const router = useRouter()
  const [collapsed, setCollapsed] = useState(false)

  const menuItems = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
      onClick: () => router.push('/dashboard'),
    },
    {
      key: 'seeds',
      icon: <ShoppingOutlined />,
      label: 'Seeds',
      onClick: () => router.push('/seeds'),
    },
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Profile',
      onClick: () => router.push('/profile'),
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Settings',
      onClick: () => router.push('/settings'),
    },
  ]

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <Menu
          mode="inline"
          style={{ height: '100%', borderRight: 0 }}
          items={menuItems}
          defaultSelectedKeys={[router.pathname.slice(1) || 'dashboard']}
        />
      </Sider>
      <Layout>
        <CustomHeader collapsed={collapsed} setCollapsed={setCollapsed} />
        <CustomContent>{children}</CustomContent>
        <Footer style={{ textAlign: 'center' }}>GrowManager ©2023</Footer>
      </Layout>
    </Layout>
  )
}
