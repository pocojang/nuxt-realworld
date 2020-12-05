<template>
  <div v-if="!fetchState.pending && !fetchState.error">
    <div class="article-page">
      <article-banner>
        <template #title>
          {{ article.title }}
        </template>
        >
        <template #article-meta>
          <ArticleMeta
            :article="article"
            :author="article.author"
            :is-my-article="isMyArticle"
            @on-toggle-follow-user="fetchToggleFollowUser"
            @on-toggle-favorite-article="fetchToggleFavoriteArticle"
          />
        </template>
      </article-banner>
      <div class="container page">
        <div class="row article-content">
          <div class="col-xs-12">
            <!-- eslint-disable-next-line vue/no-v-html -->
            <div v-html="$md.render(article.body)" />

            <ArticleTagList
              v-if="article.tagList.length"
              :tag-list="article.tagList"
            />
          </div>
        </div>
        <hr />
        <div class="article-actions">
          <ArticleMeta
            :article="article"
            :author="article.author"
            :is-my-article="isMyArticle"
            @on-toggle-follow-user="fetchToggleFollowUser"
            @on-toggle-favorite-article="fetchToggleFavoriteArticle"
          />
        </div>
        <div class="row">
          <div class="col-xs-12 col-md-8 offset-md-2">
            <template v-if="isLogin">
              <error-list v-if="errors" :errors="errors" />

              <comment-editor
                :login-user="loginUser"
                @on-create-comment="handleCreateComment"
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
  computed,
} from '@nuxtjs/composition-api'

import ArticleBanner from '@/components/article/ArticleBanner.vue'
import ArticleMeta from '@/components/article/ArticleMeta.vue'
import ArticleTagList from '@/components/article/ArticleTagList.vue'
import CommentCardList from '@/components/comment/CommentCardList.vue'
import CommentEditor from '@/components/comment/CommentEditor.vue'
import ErrorList from '@/components/common/ErrorList.vue'

import {
  useArticleSlug,
  useComment,
  useError,
  useProfileUser,
  useUser,
} from '@/compositions'
import { Comment } from '@/types'

export default defineComponent({
  name: 'AritclePage',
  components: {
    ArticleBanner,
    ArticleMeta,
    ArticleTagList,
    CommentEditor,
    CommentCardList,
    ErrorList,
  },
  setup() {
    const { app, params, query } = useContext()
    const { slug } = params.value
    const { option } = query.value

    const { state: errorState, setError } = useError()
    const {
      state: articleState,
      getArticle,
      deleteArticle,
      toggleFavoriteArticle,
    } = useArticleSlug()
    const {
      state: commentState,
      getCommentList,
      createComment,
      deleteComment,
    } = useComment()
    const { user: userState, isLogin } = useUser()
    const { followUser, unFollowUser } = useProfileUser()

    const { fetchState } = useFetch(async () => {
      await getArticle(slug)

      if (option === 'withOutComment') {
        return
      }

      await getCommentList(slug)
    })

    const isMyArticle = computed(
      () => articleState.article.author.username === userState.value.username
    )

    const onDeleteArticle = () => {
      deleteArticle(slug)

      app?.router?.back()
    }

    const onDeleteComment = (id: Comment['id']) => {
      deleteComment({ slug, id })
    }

    const handleCreateComment = async (body: string) => {
      try {
        await createComment({ slug, body })
      } catch (error) {
        setError(error)
      }
    }

    const fetchToggleFollowUser = async () => {
      if (articleState.article.author.following) {
        await unFollowUser(articleState.article.author.username)
      } else {
        await followUser(articleState.article.author.username)
      }

      await getArticle(slug)
    }

    const fetchToggleFavoriteArticle = async () => {
      const response = await toggleFavoriteArticle({
        slug,
        favorited: articleState.article.favorited,
      })

      if (response) {
        await getArticle(slug)
      }
    }

    return {
      article: toRef(articleState, 'article'),
      commentList: toRef(commentState, 'commentList'),
      errors: toRef(errorState, 'errors'),
      isLogin,
      loginUser: userState,
      fetchState,
      onDeleteArticle,
      handleCreateComment,
      onDeleteComment,
      isMyArticle,
      fetchToggleFollowUser,
      fetchToggleFavoriteArticle,
    }
  },
})
</script>
