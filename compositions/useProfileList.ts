import {
  reactive,
  ref,
  toRef,
  useContext,
  useFetch,
} from '@nuxtjs/composition-api'
import { Article, User } from '@/types'

export type PostType = 'AUTHOR' | 'FAVORITED'

type State = {
  articleList: Article[]
  articleCount: number
}

const postType = ref<PostType>('AUTHOR')

const setPostType = (type: PostType) => {
  postType.value = type
}

export default function useProfileList() {
  const { $repository, params, route } = useContext()
  const { userName } = params.value

  const state = reactive<State>({
    articleList: [],
    articleCount: 0,
  })

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

  const toggleFavoriteArticleByList = async (
    { slug, favorited }: Article,
    articleIndex: number
  ) => {
    const response = favorited
      ? await $repository.article.unFavoriteArticle(slug)
      : await $repository.article.favoriteArticle(slug)

    if (!response.article) {
      return
    }

    const isRemoveArticle = favorited && postType.value === 'FAVORITED'

    if (isRemoveArticle) {
      state.articleList = state.articleList.filter(
        (_, prevArticleIndex) => prevArticleIndex !== articleIndex
      )

      return
    }

    state.articleList = [
      ...state.articleList.slice(0, articleIndex),
      response.article,
      ...state.articleList.slice(articleIndex + 1),
    ]
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
    postType,
    articleList: toRef(state, 'articleList'),
    setPostType,
    toggleFavoriteArticleByList,
  }
}
