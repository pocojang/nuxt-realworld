<template>
  <div v-if="!fetchState.pending && !fetchState.error">
    <div class="article-page">
      <article-banner :author="article.author" :created-at="article.createdAt">
        <template v-slot:title>
          {{ article.title }}
        </template>
      </article-banner>
      <div class="container page">
        <div class="row article-content">
          <div class="col-xs-12">
            <div>
              <h1 id="world">{{ article.body }}</h1>
            </div>

            <ul v-if="article.tagList.length" class="tag-list">
              <li
                v-for="(tag, index) in article.tagList"
                :key="index"
                class="tag-default tag-pill tag-outline"
              >
                {{ tag }}
              </li>
            </ul>
          </div>
        </div>
        <hr />
        <div class="article-actions"></div>
        <div class="row">
          <div class="col-xs-12 col-md-8 offset-md-2">
            <comment-editor />
            <comment-card-list
              v-if="commentList.length"
              :comment-list="commentList"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  useContext,
  toRef,
  useFetch,
} from '@nuxtjs/composition-api'

import ArticleBanner from '~/components/ArticleBanner.vue'
import CommentCardList from '~/components/CommentCardList.vue'
import CommentEditor from '~/components/CommentEditor.vue'
import useArticle from '~/compositions/useArticle'
import useComment from '~/compositions/useComment'

/**
 *
 * TODO
 *
 * 1. route.params Handle Error
 * 2. Tag List Duplicated
 * 3. Body Parser
 *
 */
export default defineComponent({
  name: 'AritclePage',
  components: {
    ArticleBanner,
    CommentEditor,
    CommentCardList,
  },
  setup() {
    const { params, query } = useContext()

    const { state: articleState, getArticle } = useArticle()
    const { state: commentState, getCommentList } = useComment()
    const { slug } = params.value
    const { option } = query.value

    const { fetchState } = useFetch(async () => {
      await getArticle(slug)

      if (option === 'withOutComment') {
        return
      }

      await getCommentList(slug)
    })

    return {
      article: toRef(articleState, 'article'),
      commentList: toRef(commentState, 'commentList'),
      fetchState,
    }
  },
})
</script>
