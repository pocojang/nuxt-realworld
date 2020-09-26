import { NuxtAxiosInstance } from '@nuxtjs/axios'

// TODO: Model Typing
const tagRepository = (axios: NuxtAxiosInstance) => ({
  getTagList() {
    // No authentication required, returns a List of Tags
    return axios.$get('/tags')
  },
})

export default tagRepository
