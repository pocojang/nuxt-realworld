import { reactive, useContext } from '@nuxtjs/composition-api'
import {
  CreateCommentRequest,
  DeleteCommentRequest,
} from '@/api/commentRepository'
import { Article, Comment } from '@/types'

type State = {
  commentList: Comment[]
}

export default function useComment() {
  const { $repository } = useContext()

  const state = reactive<State>({
    commentList: [],
  })

  const getCommentList = async (slug: Article['slug']) => {
    const { comments } = await $repository.comment.getCommentList(slug)

    state.commentList = comments
  }

  const createComment = async (payload: CreateCommentRequest) => {
    const response = await $repository.comment.createComment(payload)

    if ('comment' in response) {
      state.commentList = [response.comment, ...state.commentList]
    }
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
