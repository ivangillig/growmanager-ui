import axios from 'axios'

export const registerOrganizationApi = async (organizationData) => {
  const response = await axios.post('/api/organizations', organizationData)
  return response.data
}
