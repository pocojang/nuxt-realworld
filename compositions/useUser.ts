import { useContext } from '@nuxtjs/composition-api'
import Vue from 'vue'

const observable = Vue.observable({
  user: {
    bio: '',
    createdAt: '',
    email: '',
    id: -1,
    image: '',
    token: '',
    updatedAt: '',
    username: '',
  },
})

export default function useUser() {
  const { $repository, $axios } = useContext()

  const fetchAuthLogin = async (payload: any) => {
    if (!payload.email || !payload.password) {
      return
    }

    const response = await $repository.user.authLogin({
      email: payload.email,
      password: payload.password,
    })

    if (response.user) {
      $axios.setToken(response.user.token, 'token')

      observable.user = response.user
    }
  }

  return {
    user: observable.user,
    fetchAuthLogin,
  }
}
