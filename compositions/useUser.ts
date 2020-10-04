import { reactive, useContext, toRef } from '@nuxtjs/composition-api'
import { AuthLoginRequest } from '~/api'
import { User } from '~/types'

type State = {
  user: User
  isLogin: boolean
}

const state = reactive<State>({
  user: {
    bio: '',
    email: '',
    image: '',
    token: '',
    username: '',
  },
  isLogin: false,
})

export default function useUser() {
  const { $repository, $axios } = useContext()

  const fetchAuthLogin = async ({ email, password }: AuthLoginRequest) => {
    if (!email || !password) {
      return
    }

    const response = await $repository.user.authLogin({
      email,
      password,
    })

    if (response.user) {
      $axios.setToken(response.user.token, 'Token')

      state.isLogin = true
      state.user = response.user

      return true
    }
  }

  return {
    user: toRef(state, 'user'),
    isLogin: toRef(state, 'isLogin'),
    fetchAuthLogin,
  }
}
