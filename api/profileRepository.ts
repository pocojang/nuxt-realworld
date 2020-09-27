import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { User } from '~/types'

type UserName = User['username']

// TODO: Response Model Typing
export const profileRepository = (axios: NuxtAxiosInstance) => ({
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

export type ProfileRepository = ReturnType<typeof profileRepository>
