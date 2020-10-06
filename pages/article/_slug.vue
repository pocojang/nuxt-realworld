<template>
  <div v-if="!fetchState.pending && !fetchState.error">
    <div class="article-page">
      <article-banner
        :article="article"
        :author="article.author"
        :is-my-article="article.author.username === loginUser.username"
        @on-delete-article="onDeleteArticle"
      >
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
            <template v-if="isLogin">
              <comment-editor
                :login-user="loginUser"
                @on-create-comment="onCreateComment"
              />
              <comment-card-list
                v-if="commentList.length"
                :comment-list="commentList"
                :login-user="loginUser"
                @on-delete-comment="onDeleteComment"
              />
            </template>
            <p v-else>
              <nuxt-link to="/login">Sign in</nuxt-link> or
              <nuxt-link to="/register">sign up</nuxt-link> to add comments on
              this article.
            </p>
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
import useUser from '~/compositions/useUser'
import { Comment } from '~/types'

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
    const { app, params, query } = useContext()
    const { slug } = params.value
    const { option } = query.value

    const { state: articleState, getArticle, deleteArticle } = useArticle()
    const {
      state: commentState,
      getCommentList,
      createComment,
      deleteComment,
    } = useComment()
    const { user: userState, isLogin } = useUser()

    const { fetchState } = useFetch(async () => {
      await getArticle(slug)

      if (option === 'withOutComment') {
        return
      }

      await getCommentList(slug)
    })

    const onDeleteArticle = () => {
      deleteArticle(slug)

      if (app?.router) {
        app.router.back()
      }
    }

    const onDeleteComment = (id: Comment['id']) => {
      deleteComment({ slug, id })
    }

    const onCreateComment = (body: string) => {
      createComment({ slug, body })
    }

    return {
      article: toRef(articleState, 'article'),
      commentList: toRef(commentState, 'commentList'),
      isLogin,
      loginUser: userState,
      fetchState,
      onDeleteArticle,
      onCreateComment,
      onDeleteComment,
    }
  },
})
</script>
