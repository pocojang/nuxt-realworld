<template>
  <Editor
    :tag-list="tagList"
    @remove-tag="removeTag"
    @on-submit="onUpdateArticle"
  >
    <template slot="title">
      <input
        v-model="title"
        type="text"
        class="form-control form-control-lg"
        placeholder="Article Title"
      />
    </template>
    <template slot="description">
      <input
        v-model="description"
        type="text"
        class="form-control"
        placeholder="What's this article about?"
      />
    </template>
    <template slot="body">
      <textarea
        v-model="body"
        class="form-control"
        rows="8"
        placeholder="Write your article (in markdown)"
      />
    </template>
    <template slot="input-tag">
      <input
        v-model="inputTag"
        type="text"
        class="form-control"
        placeholder="Enter tags"
        @keyup.enter="onEnterTag"
      />
    </template>
  </Editor>
</template>

<script lang="ts">
import {
  defineComponent,
  toRefs,
  useContext,
  useFetch,
} from '@nuxtjs/composition-api'
import { useArticleSlug, useEditor } from '~/compositions'
import Editor from '~/components/Editor.vue'

/**
 *
 * TODO:
 * 1. always success
 * 2. Duplicated Create
 *
 */
export default defineComponent({
  name: 'UpdateEditorPage',
  components: {
    Editor,
  },
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
