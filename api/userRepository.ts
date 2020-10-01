import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { User, ResponseType } from '~/types'

type AuthLoginRequest = Pick<User, 'email'> & { password: string }
type AuthRegisterRequest = AuthLoginRequest & Pick<User, 'username'>
type UpdateUserRequest = User & Pick<Partial<User>, 'email' | 'bio' | 'image'>
type UserResponse = ResponseType<'user', User>

export const userRepository = (axios: NuxtAxiosInstance) => ({
  authLogin(payload: AuthLoginRequest): UserResponse {
    // No authentication required, returns a User
    return axios.$post('/users/login', { user: payload })
  },
  authRegister(payload: AuthRegisterRequest): UserResponse {
    // No authentication required, returns a User
    return axios.$post(`/users`, { user: payload })
  },
  getCurrentUser(): UserResponse {
    // Authentication required, returns a User that's the current user
    return axios.$get('/user')
  },
  // Accepted fields: email, username, password, image, bio
  updateUser(payload: UpdateUserRequest): UserResponse {
    // Authentication required, returns the User
    return axios.$put('/user', payload)
  },
})

export type UserRepository = ReturnType<typeof userRepository>
