import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { Article, Author, Tag } from '~/types'

type Slug = Article['slug']
type UserName = Author['username']
type FeedArticleListRequest = {
  limit?: number
  offset?: number
}
type CreateArticleRequest = Pick<Article, 'title' | 'description' | 'body'> &
  Pick<Partial<Article>, 'tagList'>
type UpdateArticleRequest = Partial<
  Pick<Article, 'title' | 'description' | 'body'>
>
interface ArticleListRequest extends FeedArticleListRequest {
  tag?: Tag
  author?: UserName
  favorited?: UserName
}

// TODO: Response Model Typing
export const articleRepository = (axios: NuxtAxiosInstance) => ({
  getArticle(slug: Slug) {
    return axios.$get(`/articles/${slug}`)
  },
  getArticleList({
    tag,
    author,
    favorited,
    limit = 20,
    offset = 0,
  }: ArticleListRequest = {}) {
    const defaultParam = {
      ...(tag && { tag }),
      ...(author && { author }),
      ...(favorited && { favorited }),
    }

    // Returns most recent articles globally by default, provide tag, author or favorited query parameter to filter results
    // Authentication optional, will return multiple articles, ordered by most recent first
    return axios.$get('/articles', {
      params: { ...defaultParam, limit, offset },
    })
  },
  getFeedArticleList(params: FeedArticleListRequest) {
    // Can also take limit and offset query parameters like List Articles
    // Authentication required, will return multiple articles created by followed users, ordered by most recent first.
    return axios.$get('/articles/feed', { params })
  },
  getSlugArticleList(slug: Slug) {
    // No authentication required, will return single article
    return axios.$get(`/articles/feed/${slug}`)
  },
  createArticle(payload: CreateArticleRequest) {
    // Authentication required, will return an Article
    return axios.$post('/articles', payload)
  },
  updateArticle(payload: UpdateArticleRequest) {
    // Authentication required, returns the updated Article
    return axios.$put('/articles', payload)
  },
  deleteArticle(slug: Slug) {
    // Authentication required, returns the updated Article
    // Optional fields: title, description, body
    return axios.$delete(`/articles/${slug}`)
  },
  favoriteArticle(slug: Slug) {
    // Authentication required, returns the Article
    return axios.$post(`/articles/${slug}/favorite`)
  },
  unFavoriteArticle(slug: Slug) {
    // Authentication required, returns the Article
    return axios.$delete(`/articles/${slug}/favorite`)
  },
})

export type ArticleRepository = ReturnType<typeof articleRepository>
