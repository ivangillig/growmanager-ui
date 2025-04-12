import axios from 'axios'

export const registerOrganizationApi = (organizationData) => {
  return axios.post('/api/organizations', organizationData)
}
