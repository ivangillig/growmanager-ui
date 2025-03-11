import { Layout, Menu } from 'antd'
import { useRouter } from 'next/router'
import CustomHeader from './Header'
import CustomContent from './Content'
import { useState, useEffect } from 'react'
import {
  UserOutlined,
  DashboardOutlined,
  SettingOutlined,
  ShoppingOutlined,
} from '@ant-design/icons'
import { useTranslation } from 'next-i18next'

const { Footer, Sider } = Layout

export default function MainLayout({ children }) {
  const { t } = useTranslation()
  const router = useRouter()
  const [collapsed, setCollapsed] = useState(false)
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())

  useEffect(() => {
    setCurrentYear(new Date().getFullYear())
  }, [])

  const menuItems = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: t('Dashboard'),
      onClick: () => router.push('/dashboard'),
    },
    {
      key: 'production',
      icon: <ShoppingOutlined />,
      label: t('Productions'),
      onClick: () => router.push('/production'),
    },
    {
      key: 'seeds',
      icon: <ShoppingOutlined />,
      label: t('Seeds'),
      onClick: () => router.push('/seeds'),
    },
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: t('Profile'),
      onClick: () => router.push('/profile'),
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: t('Settings'),
      onClick: () => router.push('/settings'),
    },
  ]

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <Menu
          mode="inline"
          items={menuItems}
          defaultSelectedKeys={[router.pathname.slice(1) || 'dashboard']}
        />
      </Sider>
      <Layout>
        <CustomHeader collapsed={collapsed} setCollapsed={setCollapsed} />
        <CustomContent>{children}</CustomContent>
        <Footer style={{ textAlign: 'center' }}>
          {t('GrowManager')} ©{currentYear}
        </Footer>
      </Layout>
    </Layout>
  )
}
