import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { ROLE_TO_HOME_MAPPING, ROLES } from '../../constants/AuthConstants'
import { getHomeForRole, isLoggedIn, isRoleAllowed } from '../../lib/AuthUtils'

const RoleRedirectMiddleware = ({
  children,
  authorizedRoles = [ROLES.ANY],
  roleToHomeMapping = ROLE_TO_HOME_MAPPING,
  customAuthorized,
}) => {
  const router = useRouter()
  const user = useSelector((state) => state.auth.user)

  useEffect(() => {
    if (!isRoleAllowed(user, authorizedRoles)) {
      if (!isLoggedIn(user)) {
        router.push('/login')
      } else {
        router.push(getHomeForRole(user.role, roleToHomeMapping))
      }
    }

    if (customAuthorized && typeof customAuthorized === 'function') {
      if (!customAuthorized(user)) {
        router.push(getHomeForRole(user.role, roleToHomeMapping))
      }
    }
  }, [user, router, authorizedRoles, roleToHomeMapping, customAuthorized])

  return children
}

export default RoleRedirectMiddleware
