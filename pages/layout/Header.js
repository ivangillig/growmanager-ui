import { Layout, Button } from 'antd'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import {
  RiMenuFold3Fill,
  RiMenuFold4Fill,
  RiLogoutBoxRLine,
} from 'react-icons/ri'
import { logout } from '../../src/features/auth/authActions'

const { Header } = Layout

export default function CustomHeader({ collapsed, setCollapsed }) {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth)
  const [organizationName, setOrganizationName] = useState('')

  useEffect(() => {
    const orgName =
      auth?.user?.organization?.name ||
      localStorage.getItem('organizationName') ||
      'GrowManager'
    setOrganizationName(orgName)
  }, [auth])

  const handleLogout = () => {
    dispatch(logout())
  }

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
          <span className="logo-text">{organizationName}</span>
        </div>
      </div>
      <Button
        type="primary"
        className="logout-button"
        icon={<RiLogoutBoxRLine />}
        onClick={handleLogout}
      >
        {t('Logout')}
      </Button>
    </Header>
  )
}
