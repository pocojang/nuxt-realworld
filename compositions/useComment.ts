import { reactive, useContext } from '@nuxtjs/composition-api'
import { DeleteCommentRequest } from '~/api/commentRepository'
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

  const deleteComment = async ({ slug, id }: DeleteCommentRequest) => {
    await $repository.comment.deleteComment({ slug, id })
    await getCommentList(slug)
  }

  return {
    state,
    getCommentList,
    deleteComment,
  }
}
