import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { User } from '~/types'

type AuthLoginRequest = Pick<User, 'email'> & { password: string }
type AuthRegisterRequest = Pick<User, 'username' | 'email'> & {
  password: string
}
type UpdateUserRequest = User & Pick<Partial<User>, 'email' | 'bio' | 'image'>

// TODO: Response Model Typing
export const userRepository = (axios: NuxtAxiosInstance) => ({
  authLogin(payload: AuthLoginRequest) {
    // No authentication required, returns a User
    return axios.$post(`/users/login`, payload)
  },
  authRegister(payload: AuthRegisterRequest) {
    // No authentication required, returns a User
    return axios.$post(`/users`, payload)
  },
  getCurrentUser() {
    // Authentication required, returns a User that's the current user
    return axios.$get('/user')
  },
  // Accepted fields: email, username, password, image, bio
  updateUser(payload: UpdateUserRequest) {
    // Authentication required, returns the User
    return axios.$put('/user', payload)
  },
})

export type UserRepository = ReturnType<typeof userRepository>
