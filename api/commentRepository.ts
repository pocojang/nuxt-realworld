import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { Article, Comment } from '~/types'

type Slug = Article['slug']
type CreateComment = Pick<Comment, 'body'> & Pick<Article, 'slug'>
type DeleteComment = Pick<Comment, 'id'> & Pick<Article, 'slug'>

// TODO: Response Model Typing
const commentRepository = (axios: NuxtAxiosInstance) => ({
  getCommentList(slug: Slug) {
    // Authentication optional, returns multiple comments
    return axios.$get(`/articles/${slug}/comments`)
  },
  addComment({ body, slug }: CreateComment) {
    // Authentication required, returns the created Comment
    return axios.$post(`/articles/${slug}/comments`, {
      data: { comment: body },
    })
  },
  deleteComment({ slug, id }: DeleteComment) {
    // Authentication optional, returns multiple comments
    return axios.$delete(`/articles/${slug}/comments/${id}`)
  },
})

export default commentRepository
