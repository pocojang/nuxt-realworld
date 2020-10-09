<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <form @submit.prevent="onUpdateArticle">
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
                  @keydown.enter="onEnterTag"
                />
                <div v-if="tagList.length" class="tag-list">
                  <span
                    v-for="(tag, index) in tagList"
                    :key="index"
                    class="tag-default tag-pill"
                    ><i class="ion-close-round" @click="removeTag(index)"></i
                    >{{ tag }}</span
                  >
                </div>
              </fieldset>
              <button
                class="btn btn-lg pull-xs-right btn-primary"
                type="button"
                @click.prevent="onUpdateArticle"
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
  ref,
  toRefs,
  useContext,
  useFetch,
} from '@nuxtjs/composition-api'
import { UpdateArticlePayload } from '~/api/articleRepository'
import useArticleSlug from '~/compositions/useArticleSlug'

type State = Required<UpdateArticlePayload>

/**
 *
 * TODO:
 * 1. always success
 * 2. Duplicated Create
 *
 */
export default defineComponent({
  name: 'UpdateEditorPage',
  setup() {
    const { params, redirect } = useContext()
    const { slug } = params.value
    const { state: initState, getArticle, updateArticle } = useArticleSlug()

    const state = reactive<State>({
      title: '',
      description: '',
      body: '',
      tagList: [],
    })

    const { fetchState } = useFetch(async () => {
      await getArticle(slug)

      if (initState?.article) {
        state.title = initState.article.title
        state.description = initState.article.description
        state.body = initState.article.body
        state.tagList = initState.article.tagList
      }
    })

    const inputTag = ref('')

    const onEnterTag = () => {
      if (inputTag.value) {
        state.tagList.push(inputTag.value)

        inputTag.value = ''
      }
    }

    const removeTag = (index: number) => {
      state.tagList = state.tagList.filter((_, i) => i !== index)
    }

    // TODO: always success
    const onUpdateArticle = async () => {
      const response = await updateArticle({
        slug,
        payload: state,
      })

      if (!response) {
        return
      }

      await redirect(`/article/${response}`, { option: 'withOutComment' })
    }

    return {
      ...toRefs(state),
      fetchState,
      inputTag,
      onEnterTag,
      removeTag,
      onUpdateArticle,
    }
  },
})
</script>
