import { ROLE_TO_HOME_MAPPING, ROLES } from '@/src/constants/Roles'

export const isLoggedIn = (auth) => auth && auth.user && auth.token

export function getRole(auth) {
  return auth && auth.user && auth.user.role ? auth.user.role : null
}

export function isRoleAllowed(auth, acl) {
  const rolename = getRole(auth)
  return (
    acl.indexOf(rolename) >= 0 ||
    acl.indexOf(ROLES.ANY) >= 0 ||
    (!isLoggedIn(auth) && acl.indexOf(ROLES.UNAUTHENTICATED) >= 0)
  )
}

export function getHomeForRole(rolename) {
  return ROLE_TO_HOME_MAPPING[rolename]
    ? ROLE_TO_HOME_MAPPING[rolename]
    : ROLE_TO_HOME_MAPPING[ROLES.ANY]
}
