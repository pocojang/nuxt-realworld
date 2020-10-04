<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <form @submit.prevent="onCreateArticle">
            <fieldset>
              <fieldset class="form-group">
                <input
                  v-model="title"
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Article Title"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="description"
                  type="text"
                  class="form-control"
                  placeholder="What's this article about?"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  v-model="body"
                  class="form-control"
                  rows="8"
                  placeholder="Write your article (in markdown)"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="inputTag"
                  type="text"
                  class="form-control"
                  placeholder="Enter tags"
                />
                <div class="tag-list"></div>
              </fieldset>
              <button
                class="btn btn-lg pull-xs-right btn-primary"
                type="button"
                @click.prevent="onCreateArticle"
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
import {
  defineComponent,
  reactive,
  toRefs,
  useContext,
} from '@nuxtjs/composition-api'
import useArticle from '~/compositions/useArticle'

export default defineComponent({
  name: 'CreateEditorPage',
  setup() {
    const { redirect } = useContext()
    const { createArticle } = useArticle()

    const state = reactive({
      title: '',
      description: '',
      body: '',
      inputTag: '',
    })

    // TODO: always success
    const onCreateArticle = async () => {
      const response = await createArticle({
        title: state.title,
        description: state.description,
        body: state.body,
      })

      if (!response) {
        return
      }

      await redirect(`/article/${response}`, { option: 'withOutComment' })
    }

    return {
      ...toRefs(state),
      onCreateArticle,
    }
  },
})
</script>
