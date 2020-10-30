import { reactive, toRef, useContext, useFetch } from '@nuxtjs/composition-api'
import { Article, User } from '@/types'

export type PostType = 'AUTHOR' | 'FAVORITED'

type State = {
  articleList: Article[]
  articleCount: number
  postType: PostType
}

const state = reactive<State>({
  articleList: [],
  articleCount: 0,
  postType: 'AUTHOR',
})

export default function useProfileList() {
  const { $repository, params, route } = useContext()
  const { userName } = params.value

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

  const toggleFavoriteArticle = async (
    { slug, favorited }: Article,
    articleIndex: number
  ) => {
    const response = favorited
      ? await $repository.article.unFavoriteArticle(slug)
      : await $repository.article.favoriteArticle(slug)

    if (response.article) {
      state.articleList = [
        ...state.articleList.slice(0, articleIndex),
        response.article,
        ...state.articleList.slice(articleIndex + 1),
      ]
    }
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
    toggleFavoriteArticle,
  }
}
