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

      console.log(user, authorizedRoles)
      if (!isRoleAllowed(user, authorizedRoles)) {
        if (!isLoggedIn(auth)) {
            console.log('push to login')
          router.push('/')
        } else {
            console.log('asfafaf')
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
      return access ? <WrappedComponent {...this.props} /> : null
    }
  }

  const mapStateToProps = (state) => ({ auth: state.auth })

  return connect(mapStateToProps)(withRouter(RedirectByRole))
}

export default redirectByRole
