import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()
const BASE_URL = publicRuntimeConfig.BASE_URL

export const getFullImageUrl = (imageUrl) => {
  return `${BASE_URL}${imageUrl}`
}
