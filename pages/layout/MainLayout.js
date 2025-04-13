import { Layout, Menu } from 'antd'
import { useRouter } from 'next/router'
import CustomHeader from './Header'
import CustomContent from './Content'
import { useState, useEffect } from 'react'
import { useTranslation } from 'next-i18next'
import { FaSeedling, FaUser } from 'react-icons/fa'
import { MdAgriculture, MdDashboard } from 'react-icons/md'
import { IoSettingsSharp } from 'react-icons/io5'
import redirectByRole from '../../src/hoc/redirectByRole'
import { ROLES } from '../../src/constants/Roles'

const { Footer, Sider } = Layout

function MainLayout({ children }) {
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
      icon: <MdDashboard />,
      label: t('Dashboard'),
      onClick: () => router.push('/dashboard'),
    },
    {
      key: 'production',
      icon: <MdAgriculture />,
      label: t('Production'),
      onClick: () => router.push('/production'),
    },
    {
      key: 'seeds',
      icon: <FaSeedling />,
      label: t('Seeds'),
      onClick: () => router.push('/seeds'),
    },
    {
      key: 'profile',
      icon: <FaUser />,
      label: t('Profile'),
      onClick: () => router.push('/profile'),
    },
    {
      key: 'settings',
      icon: <IoSettingsSharp />,
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

export default redirectByRole(MainLayout, [
  ROLES.ADMIN,
  ROLES.GROWER,
  ROLES.SELLER,
  ROLES.PATIENT,
])
