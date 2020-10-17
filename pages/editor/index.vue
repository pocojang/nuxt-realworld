<template>
  <Editor
    :tag-list="tagList"
    @remove-tag="removeTag"
    @on-submit="onCreateArticle"
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
import { defineComponent, toRefs } from '@nuxtjs/composition-api'
import useEditor from '@/compositions/useEditor'
import Editor from '@/components/Editor.vue'

/**
 *
 * TODO:
 * 1. always success
 * 2. Duplicated Update
 *
 */
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
      handleCreateArticle,
    } = useEditor()

    // TODO: always success
    const onCreateArticle = () => {
      handleCreateArticle(editorState)
    }

    return {
      ...toRefs(editorState),
      onEnterTag,
      removeTag,
      onCreateArticle,
    }
  },
})
</script>
