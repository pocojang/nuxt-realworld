import { NuxtAxiosInstance } from '@nuxtjs/axios'

// TODO: Model Typing
const articleRepository = (axios: NuxtAxiosInstance) => ({
  /**
   *  Query Parameters
   *   - tag=AngularJS
   *   - author=jake
   *   - favorited=jake
   *   - limit=20 (default is 20)
   *   - offset=0 (default is 0)
   */
  getArticleList(params: any) {
    // Returns most recent articles globally by default, provide tag, author or favorited query parameter to filter results
    // Authentication optional, will return multiple articles, ordered by most recent first
    return axios.$get('/articles', { params })
  },
  getFeedArticleList(params: any) {
    // Can also take limit and offset query parameters like List Articles
    // Authentication required, will return multiple articles created by followed users, ordered by most recent first.
    return axios.$get('/articles/feed', { params })
  },
  getSlugArticleList(slug: string) {
    // No authentication required, will return single article
    return axios.$get(`/articles/feed/${slug}`)
  },
  /**
   * {
   *   "article": {
   *     "title": "How to train your dragon",
   *     "description": "Ever wonder how?",
   *     "body": "You have to believe",
   *     "tagList": ["reactjs", "angularjs", "dragons"]
   *   }
   * }
   */
  createArticle(payload: any) {
    // Authentication required, will return an Article
    // Required fields: title, description, body
    // Optional fields: tagList as an array of Strings
    return axios.$post('/articles', payload)
  },
  /**
   * {
   *   "article": {
   *     "title": "How to train your dragon",
   *     "description": "Ever wonder how?",
   *     "body": "You have to believe",
   *     "tagList": ["reactjs", "angularjs", "dragons"]
   *   }
   * }
   */
  updateArticle(payload: any) {
    // Authentication required, returns the updated Article
    // Optional fields: title, description, body
    return axios.$put('/articles', payload)
  },
  deleteArticle(slug: string) {
    // Authentication required, returns the updated Article
    // Optional fields: title, description, body
    return axios.$delete(`/articles/${slug}`)
  },
  favoriteArticle(slug: string) {
    // Authentication required, returns the Article
    return axios.$post(`/articles/${slug}/favorite`)
  },
  unFavoriteArticle(slug: string) {
    // Authentication required, returns the Article
    return axios.$delete(`/articles/${slug}/favorite`)
  },
})

export default articleRepository
