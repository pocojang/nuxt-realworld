import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { Article, Comment, ResponseType } from '~/types'

type Slug = Article['slug']
type CreateCommentRequest = Pick<Comment, 'body'> & Pick<Article, 'slug'>
type DeleteCommentRequest = Pick<Comment, 'id'> & Pick<Article, 'slug'>

type CommentResponse = ResponseType<'comment', Comment>
type CommentListResponse = ResponseType<'comments', Comment[]>

export const commentRepository = (axios: NuxtAxiosInstance) => ({
  getCommentList(slug: Slug): CommentListResponse {
    // Authentication optional, returns multiple comments
    return axios.$get(`/articles/${slug}/comments`)
  },
  createComment({ body, slug }: CreateCommentRequest): CommentResponse {
    // Authentication required, returns the created Comment
    return axios.$post(`/articles/${slug}/comments`, {
      data: { comment: body },
    })
  },
  deleteComment({ slug, id }: DeleteCommentRequest): CommentListResponse {
    // Authentication optional, returns multiple comments
    return axios.$delete(`/articles/${slug}/comments/${id}`)
  },
})

export type CommentRepository = ReturnType<typeof commentRepository>
