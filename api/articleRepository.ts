import { NuxtAxiosInstance } from '@nuxtjs/axios'
import {
  Article,
  Author,
  Tag,
  ResponseType,
  OptionalPick,
  ResponseTypes,
} from '@/types'

type Slug = Article['slug']
type UserName = Author['username']
type FeedArticleListRequest = {
  limit?: number
  offset?: number
}
export type CreateArticleRequest = Pick<
  Article,
  'title' | 'description' | 'body'
> &
  OptionalPick<Article, 'tagList'>
export type UpdateArticlePayload = Partial<CreateArticleRequest>
export type UpdateArticleRequest = {
  payload: UpdateArticlePayload
  slug: Slug
}

export interface ArticleListRequest extends FeedArticleListRequest {
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
  createArticle(payload: CreateArticleRequest): ArticleResponse {
    return axios.$post('/articles', { article: payload })
  },
  updateArticle(request: UpdateArticleRequest): ArticleResponse {
    return axios.$put(`/articles/${request.slug}`, { article: request.payload })
  },
  deleteArticle(slug: Slug) {
    return axios.$delete(`/articles/${slug}`)
  },
  favoriteArticle(slug: Slug): ArticleResponse {
    return axios.$post(`/articles/${slug}/favorite`)
  },
  unFavoriteArticle(slug: Slug): ArticleResponse {
    return axios.$delete(`/articles/${slug}/favorite`)
  },
})

export type ArticleRepository = ReturnType<typeof articleRepository>
