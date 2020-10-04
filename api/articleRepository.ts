import { NuxtAxiosInstance } from '@nuxtjs/axios'
import {
  Article,
  Author,
  Tag,
  ResponseType,
  OptionalPick,
  ResponseTypes,
} from '~/types'

type Slug = Article['slug']
type UserName = Author['username']
type FeedArticleListRequest = {
  limit?: number
  offset?: number
}
type CreateArticleRequest = Pick<Article, 'title' | 'description' | 'body'> &
  OptionalPick<Article, 'tagList'>
type UpdateArticleRequest = OptionalPick<
  Article,
  'title' | 'description' | 'body'
>

interface ArticleListRequest extends FeedArticleListRequest {
  tag?: Tag
  author?: UserName
  favorited?: UserName
}

type ArticleResponse = ResponseType<'article', Article>
type ArticleListResponse = ResponseTypes<{
  articles: Article[]
  articlesCount: number
}>

export const articleRepository = (axios: NuxtAxiosInstance) => ({
  getArticle(slug: Slug): ArticleResponse {
    return axios.$get(`/articles/${slug}`)
  },
  getArticleList({
    tag,
    author,
    favorited,
    limit = 20,
    offset = 0,
  }: ArticleListRequest = {}): ArticleListResponse {
    const defaultParam = {
      ...(tag && { tag }),
      ...(author && { author }),
      ...(favorited && { favorited }),
    }

    return axios.$get('/articles', {
      params: { ...defaultParam, limit, offset },
    })
  },
  getFeedArticleList(params: FeedArticleListRequest = {}): ArticleListResponse {
    return axios.$get('/articles/feed', { params })
  },
  getSlugArticleList(slug: Slug): ArticleResponse {
    // No authentication required, will return single article
    return axios.$get(`/articles/feed/${slug}`)
  },
  createArticle(payload: CreateArticleRequest): ArticleResponse {
    // Authentication required, will return an Article
    return axios.$post('/articles', payload)
  },
  updateArticle(payload: UpdateArticleRequest): ArticleResponse {
    // Authentication required, returns the updated Article
    return axios.$put('/articles', payload)
  },
  deleteArticle(slug: Slug) {
    // Authentication required
    return axios.$delete(`/articles/${slug}`)
  },
  favoriteArticle(slug: Slug): ArticleResponse {
    // Authentication required, returns the Article
    return axios.$post(`/articles/${slug}/favorite`)
  },
  unFavoriteArticle(slug: Slug): ArticleResponse {
    // Authentication required, returns the Article
    return axios.$delete(`/articles/${slug}/favorite`)
  },
})

export type ArticleRepository = ReturnType<typeof articleRepository>
