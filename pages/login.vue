<template>
  <FormContainer :errors="errors" @on-submit="handleLogin">
    <template #title>Sign In</template>
    <template #link>
      <nuxt-link to="/register">Need an account?</nuxt-link>
    </template>
    <template #form-group>
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
    </template>
    <template #submit-button>Sign in</template>
  </FormContainer>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  useContext,
  toRef,
  toRefs,
} from '@nuxtjs/composition-api'
import FormContainer from '@/components/FormContainer.vue'
import useUser from '@/compositions/useUser'
import useError from '@/compositions/useError'

/**
 * 1. Validation
 * 2. Fail => View
 * 3. Success => Redirect to login before page & Persist Storage & User Info
 * 4. Duplicated
 */
export default defineComponent({
  name: 'LoginPage',
  components: {
    FormContainer,
  },
  setup() {
    const { fetchAuthLogin } = useUser()
    const { state: errorState, setError } = useError()
    const { redirect } = useContext()

    const state = reactive({
      email: '',
      password: '',
    })

    const handleLogin = async () => {
      try {
        if (!state.email || !state.password) {
          return
        }

        const isOK = await fetchAuthLogin(state)

        if (isOK) {
          await redirect('/')
        }
      } catch (error) {
        setError(error)
      }
    }

    return {
      ...toRefs(state),
      errors: toRef(errorState, 'errors'),
      handleLogin,
    }
  },
})
</script>
