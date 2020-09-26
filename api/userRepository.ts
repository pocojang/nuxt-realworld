import { NuxtAxiosInstance } from '@nuxtjs/axios'

const userRepository = (axios: NuxtAxiosInstance) => ({
  /**
   * TODO: Model Typing
   *
   * {
   *   "user":{
   *     "email": "jake@jake.jake",
   *     "password": "jakejake"
   *   }
   * }
   */
  authLogin(payload: any) {
    // No authentication required, returns a User
    return axios.$post(`/api/users/login`, payload)
  },
  /**
   * TODO: Model Typing
   *
   * {
   *   "user":{
   *     "username": "Jacob",
   *     "email": "jake@jake.jake",
   *     "password": "jakejake"
   *   }
   * }
   */
  authRegister(payload: any) {
    // No authentication required, returns a User
    return axios.$post(`/api/users`, payload)
  },
  getCurrentUser() {
    // Authentication required, returns a User that's the current user
    return axios.$get('/api/user')
  },
  /**
   * TODO: Model Typing
   *
   * {
   *   "user":{
   *     "email": "jake@jake.jake",
   *     "bio": "I like to skateboard",
   *     "image": "https://i.stack.imgur.com/xHWG8.jpg"
   *   }
   * }
   *
   * Accepted fields: email, username, password, image, bio
   */
  updateUser() {
    // Authentication required, returns the User
    return axios.$put('/user')
  },
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

export default userRepository
