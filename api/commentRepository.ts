import { NuxtAxiosInstance } from '@nuxtjs/axios'

// TODO: Model Typing
const commentRepository = (axios: NuxtAxiosInstance) => ({
  getCommentList(slug: string) {
    // Authentication optional, returns multiple comments
    return axios.$get(`/articles/${slug}/comments`)
  },
  /**
   * {
   *   "comment": {
   *     "body": "His name was my name too."
   *   }
   * }
   */
  addComment(payload: any) {
    // Authentication required, returns the created Comment
    return axios.$post(`/articles/${payload.slug}/comments`, {
      data: payload.comment,
    })
  },
  deleteComment(payload: any) {
    // Authentication optional, returns multiple comments
    return axios.$delete(`/articles/${payload.slug}/comments/${payload.id}`)
  },
})

export default commentRepository
