import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'next/router'
import { ROLE_TO_HOME_MAPPING } from '../constants/Roles'
import { getHomeForRole, isLoggedIn, isRoleAllowed } from '../../lib/AuthUtils'

function redirectByRole(
  WrappedComponent,
  authorizedRoles = [],
  roleToHomeMapping = ROLE_TO_HOME_MAPPING,
  customAuthorized
) {
  class RedirectByRole extends React.Component {
    componentDidMount() {
      const { auth, router } = this.props
      const { user } = auth

      if (!isRoleAllowed(auth, authorizedRoles)) {
        if (!isLoggedIn(auth)) {
          router.push('/')
        } else if (user && !user.organization) {
          router.push('/register-organization')
        } else {
          router.push(getHomeForRole(user.role, roleToHomeMapping))
        }
      }

      if (customAuthorized && typeof customAuthorized === 'function') {
        if (!customAuthorized(auth)) {
          router.push(getHomeForRole(user.role, roleToHomeMapping))
        }
      }
    }

    render() {
      const access = isRoleAllowed(this.props.auth, authorizedRoles)
      return <>{access && <WrappedComponent {...this.props} />}</>
    }
  }

  const mapStateToProps = (state) => ({ auth: state.auth })

  return connect(mapStateToProps)(withRouter(RedirectByRole))
}

export default redirectByRole
