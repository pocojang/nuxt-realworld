import { reactive, useContext } from '@nuxtjs/composition-api'
import {
  CreateArticleRequest,
  UpdateArticleRequest,
} from '~/api/articleRepository'
import { Article } from '~/types'

type State = {
  article: Article
}

const initState = {
  article: {
    slug: '',
    title: '',
    description: '',
    body: '',
    tagList: [],
    createdAt: '',
    updatedAt: '',
    favorited: false,
    favoritesCount: 0,
    author: {
      username: '',
      bio: '',
      image: '',
      following: false,
    },
  },
}

const state = reactive<State>(initState)

export default function useArticleSlug() {
  const { $repository } = useContext()

  const getArticle = async (slug: Article['slug']) => {
    const { article } = await $repository.article.getArticle(slug)

    state.article = article
  }

  const createArticle = async (payload: CreateArticleRequest) => {
    const response = await $repository.article.createArticle(payload)

    if (response) {
      return response.article.slug
    }

    return false
  }

  const updateArticle = async (payload: UpdateArticleRequest) => {
    const response = await $repository.article.updateArticle(payload)

    if (response) {
      return response.article.slug
    }

    return false
  }

  const deleteArticle = async (slug: Article['slug']) => {
    await $repository.article.deleteArticle(slug)
  }

  return {
    state,
    getArticle,
    createArticle,
    updateArticle,
    deleteArticle,
  }
}
