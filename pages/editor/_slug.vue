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
  toRefs,
  useContext,
  useFetch,
} from '@nuxtjs/composition-api'
import { UpdateArticlePayload } from '~/api/articleRepository'
import { useArticleSlug, useEditor } from '~/compositions'

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
    const {
      state: editorState,
      setInitState,
      onEnterTag,
      removeTag,
      handleUpdateArticle,
    } = useEditor()
    const { params } = useContext()
    const { slug } = params.value
    const { state: initState, getArticle } = useArticleSlug()

    const { fetchState } = useFetch(async () => {
      await getArticle(slug)

      if (initState?.article) {
        setInitState(initState.article)
      }
    })

    // TODO: always success
    const onUpdateArticle = () => {
      handleUpdateArticle({
        slug,
        payload: editorState,
      })
    }

    return {
      ...toRefs(editorState),
      fetchState,
      onEnterTag,
      removeTag,
      onUpdateArticle,
    }
  },
})
</script>
