<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <error-list v-if="errors" :errors="errors" />
          <form @submit.prevent="$emit('on-submit')">
            <fieldset>
              <fieldset class="form-group">
                <slot name="title" />
              </fieldset>

              <fieldset class="form-group">
                <slot name="description" />
              </fieldset>

              <fieldset class="form-group">
                <slot name="body" />
              </fieldset>

              <fieldset class="form-group">
                <slot name="input-tag" />

                <div v-if="tagList.length" class="tag-list">
                  <span
                    v-for="(tag, index) in tagList"
                    :key="index"
                    class="tag-default tag-pill"
                  >
                    <i
                      class="ion-close-round"
                      @click="$emit('remove-tag', index)"
                    />
                    {{ tag }}
                  </span>
                </div>
              </fieldset>

              <button
                class="btn btn-lg pull-xs-right btn-primary"
                type="button"
                @click.prevent="$emit('on-submit')"
              >
                Publish Article
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'

import { Article, CustomErrors } from '@/types'
import ErrorList from '@/components/common/ErrorList.vue'

export default Vue.extend({
  name: 'Editor',
  components: {
    ErrorList,
  },
  props: {
    tagList: {
      type: Array,
      required: true,
      default: () => [],
    } as PropOptions<Article['tagList']>,
    errors: {
      type: Object,
      required: false,
      default: undefined,
    } as PropOptions<CustomErrors>,
  },
})
</script>
