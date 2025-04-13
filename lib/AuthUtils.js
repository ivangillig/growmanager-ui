export const isLoggedIn = (auth) => auth.user && auth.token

export const isRoleAllowed = (user, authorizedRoles) => {
  if (!user || !user.role) return false
  return (
    authorizedRoles.includes(user.role) || authorizedRoles.includes(ROLES.ANY)
  )
}

export const getHomeForRole = (role, roleToHomeMapping) => {
  return roleToHomeMapping[role] || '/login'
}
