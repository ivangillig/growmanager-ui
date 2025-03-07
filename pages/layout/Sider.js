import { Layout, Menu } from 'antd'
import {
  UserOutlined,
  DashboardOutlined,
  SettingOutlined,
  ShoppingOutlined,
} from '@ant-design/icons'
import { useRouter } from 'next/router'

const { Sider } = Layout

export default function CustomSider() {
  const router = useRouter()

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
      label: 'seeds',
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
    <Sider width={200} theme="light">
      <Menu
        mode="inline"
        style={{ height: '100%', borderRight: 0 }}
        items={menuItems}
        defaultSelectedKeys={[router.pathname.slice(1) || 'dashboard']}
      />
    </Sider>
  )
}
