<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>
          <form @submit.prevent="onSubmitUpdate">
            <fieldset>
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
              <button
                class="btn btn-lg btn-primary pull-xs-right"
                type="submit"
                @click.prevent="onSubmitUpdate"
              >
                Update Settings
              </button>
            </fieldset>
          </form>
          <hr />
          <button class="btn btn-outline-danger" @click="onLogout">
            Or click here to logout.
          </button>
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
  useFetch,
} from '@nuxtjs/composition-api'
import useUser from '~/compositions/useUser'

export default defineComponent({
  name: 'SettingsPage',
  setup() {
    const { redirect } = useContext()
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

    const onSubmitUpdate = async () => {
      const isOK = await fetchUpdateUser({ ...state, username: state.userName })

      if (isOK) {
        await redirect('/')
      }
    }

    const onLogout = () => {
      authLogout()
      redirect('/')
    }

    return { ...toRefs(state), onSubmitUpdate, onLogout }
  },
})
</script>
