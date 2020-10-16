<template>
  <FormContainer @on-submit="handleLogin">
    <template v-slot:title>Sign In</template>
    <template v-slot:link>
      <nuxt-link to="/register">Need an account?</nuxt-link>
    </template>
    <template v-slot:form-group>
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
    <template v-slot:submit-button>Sign in</template>
  </FormContainer>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  useContext,
  toRefs,
} from '@nuxtjs/composition-api'
import FormContainer from '@/components/FormContainer.vue'
import useUser from '~/compositions/useUser'

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
