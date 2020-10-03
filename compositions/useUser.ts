import { computed, reactive, useContext, toRef } from '@nuxtjs/composition-api'
import { AuthLoginRequest } from '~/api'

const state = reactive({
  user: {
    bio: '',
    email: '',
    image: '',
    token: '',
    username: '',
  },
})

export default function useUser() {
  const { $repository, $axios } = useContext()

  const fetchAuthLogin = async (payload: AuthLoginRequest) => {
    if (!payload.email || !payload.password) {
      return
    }

    const response = await $repository.user.authLogin({
      email: payload.email,
      password: payload.password,
    })

    if (response.user) {
      $axios.setToken(response.user.token, 'token')
      state.user = response.user
    }
  }

  return {
    user: toRef(state, 'user'),
    isLogin: computed(() => !!state.user.token),
    fetchAuthLogin,
  }
}