<template>
  <FormContainer
    name="settings-page"
    :errors="errors"
    @on-submit="handleUpdate"
  >
    <template #title>Your Settings</template>
    <template #form-group>
      <fieldset class="form-group">
        <input
          v-model="image"
          type="text"
          class="form-control"
          placeholder="URL of profile picture"
        />
      </fieldset>
      <fieldset class="form-group">
        <input
          v-model="userName"
          type="text"
          class="form-control form-control-lg"
          placeholder="Username"
        />
      </fieldset>
      <fieldset class="form-group">
        <textarea
          v-model="bio"
          class="form-control form-control-lg"
          rows="8"
          placeholder="Short bio about you"
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
          placeholder="New Password"
        />
      </fieldset>
    </template>
    <template #submit-button>Update Settings</template>
    <template #sub-contents>
      <hr />
      <button class="btn btn-outline-danger" @click="onLogout">
        Or click here to logout.
      </button>
    </template>
  </FormContainer>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  useContext,
  toRefs,
  useFetch,
  toRef,
} from '@nuxtjs/composition-api'
import useUser from '@/compositions/useUser'
import { useError } from '@/compositions'

export default defineComponent({
  name: 'SettingsPage',
  setup() {
    const { redirect } = useContext()
    const { state: errorState, setError } = useError()
    const { user, fetchUpdateUser, authLogout } = useUser()

    const state = reactive({
      userName: '',
      email: '',
      password: '',
      bio: '',
      image: '',
    })

    useFetch(() => {
      const userInfo = user.value

      state.userName = userInfo.username
      state.email = userInfo.email
      state.bio = userInfo.bio
      state.image = userInfo.image
    })

    const handleUpdate = async () => {
      try {
        const isOK = await fetchUpdateUser({
          ...state,
          username: state.userName,
        })

        if (isOK) {
          redirect('/')
        }
      } catch (error) {
        setError(error)
      }
    }

    const onLogout = () => {
      authLogout()
      redirect('/')
    }

    return {
      ...toRefs(state),
      errors: toRef(errorState, 'errors'),
      handleUpdate,
      onLogout,
    }
  },
})
</script>
