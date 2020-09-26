import { NuxtAxiosInstance } from '@nuxtjs/axios'

// TODO: Model Typing
const profileRepository = (axios: NuxtAxiosInstance) => ({
  getProfile(userName: string) {
    return axios.$get(`/profiles/${userName}`)
  },
  followUser(userName: string) {
    return axios.$post(`/profiles/${userName}/follow`)
  },
  unFollowUser(userName: string) {
    return axios.$delete(`/profiles/${userName}/follow`)
  },
})

export default profileRepository
