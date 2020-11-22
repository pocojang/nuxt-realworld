import { reactive, useContext } from '@nuxtjs/composition-api'
import {
  CreateArticleRequest,
  UpdateArticleRequest,
} from '@/api/articleRepository'
import { Article } from '@/types'

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

export default function useArticleSlug() {
  const { $repository } = useContext()

  const state = reactive<State>(initState)

  const getArticle = async (slug: Article['slug']) => {
    const { article } = await $repository.article.getArticle(slug)

    state.article = article
  }

  const createArticle = async (payload: CreateArticleRequest) => {
    const response = await $repository.article.createArticle(payload)

    if ('article' in response) {
      return response.article
    }

    return false
  }

  const updateArticle = async (payload: UpdateArticleRequest) => {
    const response = await $repository.article.updateArticle(payload)

    if ('article' in response) {
      return response.article
    }

    return false
  }

  const deleteArticle = async (slug: Article['slug']) => {
    await $repository.article.deleteArticle(slug)
  }

  const toggleFavoriteArticle = ({
    slug,
    favorited,
  }: Pick<Article, 'slug' | 'favorited'>) => {
    if (favorited) {
      return $repository.article.unFavoriteArticle(slug)
    }

    return $repository.article.favoriteArticle(slug)
  }

  return {
    state,
    getArticle,
    createArticle,
    updateArticle,
    deleteArticle,
    toggleFavoriteArticle,
  }
}
