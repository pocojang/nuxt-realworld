import { reactive, useContext } from '@nuxtjs/composition-api'
import {
  CreateCommentRequest,
  DeleteCommentRequest,
} from '~/api/commentRepository'
import { Article, Comment } from '~/types'

type State = {
  commentList: Comment[]
}

const state = reactive<State>({
  commentList: [],
})

export default function useComment() {
  const { $repository } = useContext()

  const getCommentList = async (slug: Article['slug']) => {
    const { comments } = await $repository.comment.getCommentList(slug)

    state.commentList = comments
  }

  const createComment = async (payload: CreateCommentRequest) => {
    const { comment } = await $repository.comment.createComment(payload)

    state.commentList = [comment, ...state.commentList]
  }

  const deleteComment = async ({ slug, id }: DeleteCommentRequest) => {
    await $repository.comment.deleteComment({ slug, id })
    await getCommentList(slug)
  }

  return {
    state,
    getCommentList,
    createComment,
    deleteComment,
  }
}
