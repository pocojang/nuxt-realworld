import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { Article, Comment, CustomErrors, ResponseType } from '@/types'

type Slug = Article['slug']
export type CreateCommentRequest = Pick<Comment, 'body'> & Pick<Article, 'slug'>
export type DeleteCommentRequest = Pick<Comment, 'id'> & Pick<Article, 'slug'>

type CommentResponse = ResponseType<'comment', Comment>
type CommentListResponse = ResponseType<'comments', Comment[]>

export const commentRepository = (axios: NuxtAxiosInstance) => ({
  getCommentList(slug: Slug): CommentListResponse {
    return axios.$get(`/articles/${slug}/comments`)
  },
  createComment({
    body,
    slug,
  }: CreateCommentRequest): CommentResponse | CustomErrors {
    return axios.$post(`/articles/${slug}/comments`, {
      comment: { body },
    })
  },
  deleteComment({ slug, id }: DeleteCommentRequest): Promise<void> {
    return axios.$delete(`/articles/${slug}/comments/${id}`)
  },
})

export type CommentRepository = ReturnType<typeof commentRepository>
