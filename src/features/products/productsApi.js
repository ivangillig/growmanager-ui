import axios from 'axios'
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()
const { BASE_URL } = publicRuntimeConfig

export const fetchProductsApi = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/products`)
    return response.data
  } catch (error) {
    throw new Error('Failed to fetch products')
  }
}

export const addProductApi = async (product) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/products`, product, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return response.data
  } catch (error) {
    throw new Error('Failed to add product')
  }
}
