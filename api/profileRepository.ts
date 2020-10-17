import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { Profile, User, ResponseType } from '@/types'

type UserName = User['username']
type ProfileResponse = ResponseType<'profile', Profile>

export const profileRepository = (axios: NuxtAxiosInstance) => ({
  getProfile(userName: UserName): ProfileResponse {
    return axios.$get(`/profiles/${userName}`)
  },
  followUser(userName: UserName): ProfileResponse {
    return axios.$post(`/profiles/${userName}/follow`)
  },
  unFollowUser(userName: UserName): ProfileResponse {
    return axios.$delete(`/profiles/${userName}/follow`)
  },
})

export type ProfileRepository = ReturnType<typeof profileRepository>
