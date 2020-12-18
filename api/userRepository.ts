import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { User, ResponseType, OptionalPick, CustomErrors } from '@/types'

export type AuthLoginRequest = Pick<User, 'email'> & { password: string }
export type AuthRegisterRequest = AuthLoginRequest & Pick<User, 'username'>
export type UpdateUserRequest = OptionalPick<
  User,
  'email' | 'username' | 'bio' | 'image'
> & { password?: string }
type UserResponse = ResponseType<'user', User>

export const userRepository = (axios: NuxtAxiosInstance) => ({
  authLogin(payload: AuthLoginRequest): UserResponse | CustomErrors {
    return axios.$post('/users/login', { user: payload })
  },
  authRegister(payload: AuthRegisterRequest): UserResponse | CustomErrors {
    return axios.$post(`/users`, { user: payload })
  },
  getCurrentUser(token: User['token']): UserResponse {
    return axios.$get('/user', {
      headers: {
        authorization: 'Token ' + token,
      },
    })
  },
  updateUser(payload: UpdateUserRequest): UserResponse | CustomErrors {
    return axios.$put('/user', payload)
  },
})

export type UserRepository = ReturnType<typeof userRepository>
