import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { User } from '~/types'

type UserName = User['username']

// TODO: Response Model Typing
const profileRepository = (axios: NuxtAxiosInstance) => ({
  getProfile(userName: UserName) {
    return axios.$get(`/profiles/${userName}`)
  },
  followUser(userName: UserName) {
    return axios.$post(`/profiles/${userName}/follow`)
  },
  unFollowUser(userName: UserName) {
    return axios.$delete(`/profiles/${userName}/follow`)
  },
})

export default profileRepository
