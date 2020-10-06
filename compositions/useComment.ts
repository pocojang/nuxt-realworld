import { reactive, useContext } from '@nuxtjs/composition-api'
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

  return {
    state,
    getCommentList,
  }
}
