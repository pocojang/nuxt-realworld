import { reactive, ref, useContext } from '@nuxtjs/composition-api'
import { ArticleListRequest } from '@/api/articleRepository'
import { Article, Tag } from '@/types'
import useArticleSlug from './useArticleSlug'

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
  const { toggleFavoriteArticle } = useArticleSlug()

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

  const getFeedArticleList = async (offset = 0) => {
    const {
      articles,
      articlesCount,
    } = await $repository.article.getFeedArticleList({ offset })

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

  const toggleFavoriteArticleByList = async (
    { slug, favorited }: Pick<Article, 'slug' | 'favorited'>,
    articleIndex: number
  ) => {
    const response = await toggleFavoriteArticle({ slug, favorited })

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
    feedType,
    getArticleList,
    getFeedArticleList,
    getArticleListByTag,
    getArticleListByFeed,
    toggleFavoriteArticleByList,
    setFeedType,
  }
}
