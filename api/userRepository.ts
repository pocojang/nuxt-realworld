import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { User, ResponseType, OptionalPick } from '~/types'

export type AuthLoginRequest = Pick<User, 'email'> & { password: string }
export type AuthRegisterRequest = AuthLoginRequest & Pick<User, 'username'>
export type UpdateUserRequest = OptionalPick<
  User,
  'email' | 'username' | 'bio' | 'image'
> & { password?: string }
type UserResponse = ResponseType<'user', User>

export const userRepository = (axios: NuxtAxiosInstance) => ({
  authLogin(payload: AuthLoginRequest): UserResponse {
    return axios.$post('/users/login', { user: payload })
  },
  authRegister(payload: AuthRegisterRequest): UserResponse {
    return axios.$post(`/users`, { user: payload })
  },
  getCurrentUser(): UserResponse {
    return axios.$get('/user')
  },
  updateUser(payload: UpdateUserRequest): UserResponse {
    return axios.$put('/user', payload)
  },
})

export type UserRepository = ReturnType<typeof userRepository>
