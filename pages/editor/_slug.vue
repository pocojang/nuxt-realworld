<template>
  <Editor
    :errors="errors"
    :tag-list="tagList"
    @remove-tag="removeTag"
    @on-submit="handleUpdateArticle"
  >
    <template #title>
      <input
        v-model="title"
        type="text"
        class="form-control form-control-lg"
        placeholder="Article Title"
      />
    </template>
    <template #description>
      <input
        v-model="description"
        type="text"
        class="form-control"
        placeholder="What's this article about?"
      />
    </template>
    <template #body>
      <textarea
        v-model="body"
        class="form-control"
        rows="8"
        placeholder="Write your article (in markdown)"
      />
    </template>
    <template #input-tag>
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
  toRef,
  toRefs,
  useContext,
  useFetch,
} from '@nuxtjs/composition-api'

import { useArticleSlug, useEditor, useError } from '@/compositions'
import Editor from '@/components/common/Editor.vue'

// TODO: [Vue warn]: toRefs() expects a reactive object but received a plain one.
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
      redirectBySuccess,
    } = useEditor()
    const { state: errorState, setError } = useError()
    const { params } = useContext()
    const { slug } = params.value
    const { state: initState, getArticle, updateArticle } = useArticleSlug()

    const { fetchState } = useFetch(async () => {
      await getArticle(slug)

      if (initState?.article) {
        setInitState(initState.article)
      }
    })

    const handleUpdateArticle = async () => {
      try {
        const newArticle = await updateArticle({
          slug,
          payload: editorState,
        })

        if (!newArticle) {
          return
        }

        redirectBySuccess(newArticle)
      } catch (error) {
        setError(error)
      }
    }

    return {
      ...toRefs(editorState),
      errors: toRef(errorState, 'errors'),
      fetchState,
      onEnterTag,
      removeTag,
      handleUpdateArticle,
    }
  },
})
</script>
