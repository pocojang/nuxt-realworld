import { reactive, useContext } from '@nuxtjs/composition-api'
import useUser from './useUser'
import { ArticleListRequest } from '~/api/articleRepository'
import { Article, Tag, User } from '~/types'

type FeedType = 'GLOBAL' | 'YOUR'
export type PostType = 'AUTHOR' | 'FAVORITED'

type State = {
  articleList: Article[]
  articleCount: number
  feedType: FeedType
  postType: PostType
}

const state = reactive<State>({
  articleList: [],
  articleCount: 0,
  feedType: 'GLOBAL',
  postType: 'AUTHOR',
})

const setFeedType = (type: FeedType) => {
  state.feedType = type
}

const setPostType = (type: PostType) => {
  state.postType = type
}

export default function useArticle() {
  const { $repository, redirect } = useContext()
  const { isLogin } = useUser()

  const getArticleList = async (payload: ArticleListRequest = {}) => {
    const {
      articles,
      articlesCount,
    } = await $repository.article.getArticleList(payload)

    state.articleList = articles
    state.articleCount = articlesCount
  }

  const getFeedArticleList = async () => {
    const {
      articles,
      articlesCount,
    } = await $repository.article.getFeedArticleList()

    state.articleList = articles
    state.articleCount = articlesCount
  }

  const getArticleListByTag = async (tag: Tag) => {
    const {
      articles,
      articlesCount,
    } = await $repository.article.getArticleList({ tag })

    state.articleList = articles
    state.articleCount = articlesCount
  }

  const handleFeedToggle = async (listType: FeedType) => {
    const fetchArticleBy = {
      GLOBAL: getArticleList,
      YOUR: getFeedArticleList,
    }

    await fetchArticleBy[listType]()

    setFeedType(listType)
  }

  const handlePostToggle = async ({
    userName,
    postType = 'AUTHOR',
  }: {
    userName: User['username']
    postType: PostType
  }) => {
    await getArticleList({
      [postType.toLowerCase()]: userName,
    })

    setPostType(postType)
  }

  const fetchToggleFavorite = async (articleIndex: number) => {
    if (!isLogin.value) {
      redirect('/login')

      return
    }

    const selectedArticle = state.articleList[articleIndex]
    const response = selectedArticle?.favorited
      ? await $repository.article.unFavoriteArticle(selectedArticle.slug)
      : await $repository.article.favoriteArticle(selectedArticle.slug)

    if (response.article) {
      state.articleList = [
        ...state.articleList.slice(0, articleIndex),
        response.article,
        ...state.articleList.slice(articleIndex + 1),
      ]
    }
  }

  return {
    state,
    getArticleList,
    getFeedArticleList,
    getArticleListByTag,
    handleFeedToggle,
    handlePostToggle,
    fetchToggleFavorite,
    setFeedType,
    setPostType,
  }
}
