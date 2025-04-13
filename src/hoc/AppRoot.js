import React from 'react'
import { connect } from 'react-redux'
import { ROLES } from '../constants/Roles'
import redirectByRole from '../hoc/redirectByRole'
import MainLayout from '@/pages/layout/MainLayout'

function AppRoot({ children, ...props }) {
  return <MainLayout {...props}>{children}</MainLayout>
}

export default connect(
  null,
  {}
)(
  redirectByRole(AppRoot, [
    ROLES.ADMIN,
    ROLES.GROWER,
    ROLES.SELLER,
    ROLES.PATIENT,
  ])
)
