<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign Up</h1>
          <p class="text-xs-center">
            <nuxt-link to="/login"> Have an account?</nuxt-link>
          </p>
          <form>
            <fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Username"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="email"
                  class="form-control form-control-lg"
                  placeholder="Email"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
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
export default {
  name: 'Register',
}
</script>
