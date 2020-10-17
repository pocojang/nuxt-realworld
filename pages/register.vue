<template>
  <FormContainer @on-submit="handleRegister">
    <template v-slot:title>Sign Up</template>
    <template v-slot:link>
      <nuxt-link to="/login"> Have an account?</nuxt-link>
    </template>
    <template v-slot:form-group>
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
    </template>
    <template v-slot:submit-button>Sign Up</template>
  </FormContainer>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  useContext,
  toRefs,
} from '@nuxtjs/composition-api'
import useUser from '@/compositions/useUser'

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
