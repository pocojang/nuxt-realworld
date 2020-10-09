<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign In</h1>
          <p class="text-xs-center">
            <nuxt-link to="/register">Need an account?</nuxt-link>
          </p>

          <ul class="error-messages">
            <li>That email is already taken</li>
          </ul>

          <form @submit.prevent="handleLogin">
            <fieldset class="form-group">
              <input
                v-model="email"
                type="email"
                class="form-control form-control-lg"
                placeholder="Email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                v-model="password"
                type="password"
                class="form-control form-control-lg"
                placeholder="Password"
              />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right" type="submit">
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  useContext,
  toRefs,
} from '@nuxtjs/composition-api'
import useUser from '~/compositions/useUser'

/**
 * 1. Validation
 * 2. Fail => View
 * 3. Success => Redirect to login before page & Persist Storage & User Info
 * 4. Duplicated
 */
export default defineComponent({
  name: 'LoginPage',
  setup() {
    const { fetchAuthLogin } = useUser()
    const { redirect } = useContext()

    const state = reactive({
      email: '',
      password: '',
    })

    // TODO: Always Success
    const handleLogin = async () => {
      const isOK = await fetchAuthLogin(state)

      if (isOK) {
        await redirect('/')
      }
    }

    return {
      ...toRefs(state),
      handleLogin,
    }
  },
})
</script>
