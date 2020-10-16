<template>
  <div :class="name">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">
            <slot name="title" />
          </h1>
          <p v-if="$slots.link" class="text-xs-center">
            <slot name="link" />
          </p>

          <ul class="error-messages">
            <li>This is Example Error Message</li>
          </ul>

          <form @submit.prevent="$emit('on-submit')">
            <fieldset>
              <slot name="form-group" />
              <button
                class="btn btn-lg btn-primary pull-xs-right"
                type="submit"
                @click="$emit('on-submit')"
              >
                <slot name="submit-button" />
              </button>
            </fieldset>
          </form>
          <slot name="sub-contents" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'FormContainer',
  props: {
    name: {
      type: String,
      required: false,
      default: 'auth-page',
    },
  },
})
</script>
