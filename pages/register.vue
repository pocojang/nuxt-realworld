<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign Up</h1>
          <p class="text-xs-center">
            <nuxt-link to="/login"> Have an account?</nuxt-link>
          </p>
          <form @submit.prevent="handleRegister">
            <fieldset>
              <fieldset class="form-group">
                <input
                  v-model="userName"
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Username"
                />
              </fieldset>
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
              <button
                class="btn btn-lg btn-primary pull-xs-right"
                type="submit"
              >
                Sign Up
              </button>
            </fieldset>
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
import useArticle from '~/compositions/useArticle'
import useUser from '~/compositions/useUser'

/**
 * TODO: WIP
 *
 * 1. Validation
 * 2. Fail => View
 * 3. Success => ??
 * 4. Duplicated
 */
export default defineComponent({
  name: 'RegisterPage',
  setup() {
    const { redirect } = useContext()
    const { setFeedType } = useArticle()
    const { fetchAuthRegister } = useUser()

    const state = reactive({
      userName: '',
      email: '',
      password: '',
    })

    // TODO: Always Success
    const handleRegister = async () => {
      const isOK = await fetchAuthRegister({
        ...state,
        username: state.userName,
      })

      if (isOK) {
        setFeedType('YOUR')
        await redirect('/')
      }
    }

    return {
      ...toRefs(state),
      handleRegister,
    }
  },
})
</script>
