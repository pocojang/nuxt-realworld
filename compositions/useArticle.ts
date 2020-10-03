import { reactive, useContext } from '@nuxtjs/composition-api'
import { Article, Tag } from '~/types'

type State = {
  articleList: Article[]
  articleCount: number
}

const state = reactive<State>({
  articleList: [],
  articleCount: 0,
})

export default function useArticle() {
  const { $repository } = useContext()

  const getArticleList = async () => {
    const {
      articles,
      articlesCount,
    } = await $repository.article.getArticleList()

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

  return {
    state,
    getArticleList,
    getArticleListByTag,
  }
}
