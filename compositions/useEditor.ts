import { markRaw, reactive, useContext } from '@nuxtjs/composition-api'

import {
  CreateArticleRequest,
  UpdateArticleRequest,
} from '@/api/articleRepository'
import { Article } from '@/types'

import useArticleSlug from './useArticleSlug'

type ArticlePayload = Required<CreateArticleRequest>
type State = ArticlePayload & {
  inputTag: ''
}

export default function useEditor() {
  const { redirect } = useContext()
  const { createArticle, updateArticle } = useArticleSlug()

  const setInitState = (article: ArticlePayload) => {
    state.title = article.title
    state.description = article.description
    state.body = article.body
    state.tagList = article.tagList
  }

  const state = reactive<State>({
    title: '',
    description: '',
    body: '',
    tagList: [],
    inputTag: '',
  })

  const onEnterTag = () => {
    if (state.inputTag) {
      state.tagList.push(state.inputTag)

      state.inputTag = ''
    }
  }

  const removeTag = (index: number) => {
    state.tagList = state.tagList.filter((_, i) => i !== index)
  }

  const redirectBySuccess = (newArticle: Article) => {
    redirect(`/article/${newArticle.slug}`, { option: 'withOutComment' })
  }

  const handleCreateArticle = async (payload: CreateArticleRequest) => {
    const resNewArticle = await createArticle(payload)

    if (!resNewArticle) {
      return
    }

    redirectBySuccess(resNewArticle)
  }

  const handleUpdateArticle = async (payload: UpdateArticleRequest) => {
    const resNewArticle = await updateArticle(payload)

    if (!resNewArticle) {
      return
    }

    redirectBySuccess(resNewArticle)
  }

  return {
    state: markRaw(state),
    setInitState,
    onEnterTag,
    removeTag,
    handleCreateArticle,
    handleUpdateArticle,
  }
}
