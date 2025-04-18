export const ROLES = {
  UNAUTHENTICATED: 'UNAUTHENTICATED',
  ADMIN: 'admin',
  GROWER: 'grower',
  SELLER: 'seller',
  PATIENT: 'patient',
  ANY: 'any',
}

export const ROLE_TO_HOME_MAPPING = {
  admin: '/dashboard',
  grower: '/production',
  seller: '/sales',
  patient: '/profile',
}
