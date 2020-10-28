import { reactive, toRef, useContext, useFetch } from '@nuxtjs/composition-api'
import { Article, User } from '@/types'

export type PostType = 'AUTHOR' | 'FAVORITED'

type State = {
  articleList: Article[]
  articleCount: number
  postType: PostType
}

export default function useProfileList() {
  const { $repository, params, route } = useContext()
  const { userName } = params.value

  const state = reactive<State>({
    articleList: [],
    articleCount: 0,
    postType: 'AUTHOR',
  })

  const setPostType = (type: PostType) => {
    state.postType = type
  }

  const getArticleListByPost = async ({
    userName,
    postType = 'AUTHOR',
  }: {
    userName: User['username']
    postType: PostType
  }) => {
    const {
      articles,
      articlesCount,
    } = await $repository.article.getArticleList({
      [postType.toLowerCase()]: userName,
    })

    state.articleList = articles
    state.articleCount = articlesCount
  }

  const { fetchState } = useFetch(async () => {
    const postTypeBy: { [P: string]: PostType } = {
      'profile-userName': 'AUTHOR',
      'profile-userName-favorites': 'FAVORITED',
    }

    if (route.value.name) {
      const postType = postTypeBy[route.value.name]

      await getArticleListByPost({ userName, postType })
    }
  })

  return {
    fetchState,
    articleList: toRef(state, 'articleList'),
    postType: toRef(state, 'postType'),
    setPostType,
  }
}
