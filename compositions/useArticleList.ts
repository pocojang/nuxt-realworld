import { reactive, ref, toRef, useContext } from '@nuxtjs/composition-api'
import { ArticleListRequest } from '@/api/articleRepository'
import { Article, Tag } from '@/types'

export type FeedType = 'GLOBAL' | 'YOUR'

type State = {
  articleList: Article[]
  articleCount: number
}

const feedType = ref<FeedType>('GLOBAL')

const setFeedType = (type: FeedType) => {
  feedType.value = type
}

export default function useArticleList() {
  const { $repository } = useContext()

  const state = reactive<State>({
    articleList: [],
    articleCount: 0,
  })

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

  const getArticleListByFeed = async (listType: FeedType) => {
    const fetchArticleBy = {
      GLOBAL: getArticleList,
      YOUR: getFeedArticleList,
    }

    await fetchArticleBy[listType]()

    setFeedType(listType)
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

  return {
    articleList: toRef(state, 'articleList'),
    feedType,
    getArticleList,
    getFeedArticleList,
    getArticleListByTag,
    getArticleListByFeed,
    toggleFavoriteArticle,
    setFeedType,
  }
}
