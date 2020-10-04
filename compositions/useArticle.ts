import { reactive, useContext } from '@nuxtjs/composition-api'
import { ArticleListRequest } from '~/api/articleRepository'
import { Article, Tag } from '~/types'

type State = {
  articleList: Article[]
  articleCount: number
  feedType: 'GLOBAL' | 'YOUR'
}

const state = reactive<State>({
  articleList: [],
  articleCount: 0,
  feedType: 'GLOBAL',
})

const setFeedType = (type: State['feedType']) => {
  state.feedType = type
}

export default function useArticle() {
  const { $repository } = useContext()

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

  const handleFeedToggle = async (feedType: 'GLOBAL' | 'YOUR') => {
    const fetchArticleBy = {
      GLOBAL: getArticleList,
      YOUR: getFeedArticleList,
    }

    await fetchArticleBy[feedType]()

    setFeedType(feedType)
  }

  return {
    state,
    getArticleList,
    getFeedArticleList,
    getArticleListByTag,
    handleFeedToggle,
    setFeedType,
  }
}
