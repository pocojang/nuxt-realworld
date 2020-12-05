<template>
  <Editor
    :errors="errors"
    :tag-list="tagList"
    @remove-tag="removeTag"
    @on-submit="handleCreateArticle"
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
import { defineComponent, toRef, toRefs } from '@nuxtjs/composition-api'

import useEditor from '@/compositions/useEditor'
import Editor from '@/components/common/Editor.vue'
import { useArticleSlug, useError } from '@/compositions'

// TODO: [Vue warn]: toRefs() expects a reactive object but received a plain one.
export default defineComponent({
  name: 'CreateEditorPage',
  components: {
    Editor,
  },
  setup() {
    const {
      state: editorState,
      onEnterTag,
      removeTag,
      redirectBySuccess,
    } = useEditor()
    const { state: errorState, setError } = useError()
    const { createArticle } = useArticleSlug()

    const handleCreateArticle = async () => {
      try {
        const newArticle = await createArticle(editorState)

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
      onEnterTag,
      removeTag,
      handleCreateArticle,
    }
  },
})
</script>
