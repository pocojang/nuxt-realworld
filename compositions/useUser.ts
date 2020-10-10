import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { reactive, useContext, toRef } from '@nuxtjs/composition-api'
import { AuthLoginRequest, AuthRegisterRequest, UpdateUserRequest } from '~/api'
import { User } from '~/types'

type State = {
  user: User
  isLogin: boolean
}

const initState = {
  user: {
    bio: '',
    email: '',
    image: '',
    token: '',
    username: '',
  },
  isLogin: false,
}

const state = reactive<State>(initState)

const setLogin = ({
  axios,
  user,
}: {
  axios: NuxtAxiosInstance
  user: User
}) => {
  state.isLogin = true
  state.user = user

  axios.setToken(user.token, 'Token')
  window.localStorage.setItem('token', user.token)
}

export default function useUser() {
  const { $axios, $repository } = useContext()

  const retryLogin = async (token: User['token']) => {
    const response = await $repository.user.getCurrentUser(token)

    if (response.user) {
      setLogin({
        axios: $axios,
        user: response.user,
      })
    }
  }

  const fetchAuthLogin = async ({ email, password }: AuthLoginRequest) => {
    if (!email || !password) {
      return
    }

    const response = await $repository.user.authLogin({
      email,
      password,
    })

    if (response.user) {
      setLogin({
        axios: $axios,
        user: response.user,
      })

      return true
    }
  }

  const fetchAuthRegister = async ({
    username,
    email,
    password,
  }: AuthRegisterRequest) => {
    if (!email || !password) {
      return
    }

    const response = await $repository.user.authRegister({
      username,
      email,
      password,
    })

    if (response.user) {
      setLogin({
        axios: $axios,
        user: response.user,
      })

      return true
    }

    return false
  }

  const fetchUpdateUser = async (payload: UpdateUserRequest) => {
    const response = await $repository.user.updateUser(payload)

    if (response.user) {
      state.user = response.user

      return true
    }

    return false
  }

  const authLogout = () => {
    $axios.setToken(false)

    state.isLogin = false
    state.user = initState.user
  }

  return {
    user: toRef(state, 'user'),
    isLogin: toRef(state, 'isLogin'),
    fetchAuthLogin,
    fetchAuthRegister,
    fetchUpdateUser,
    authLogout,
    retryLogin,
  }
}
