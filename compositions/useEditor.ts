import { markRaw, reactive, useContext } from '@nuxtjs/composition-api'

import { CreateArticleRequest } from '@/api/articleRepository'
import { Article } from '@/types'

type ArticlePayload = Required<CreateArticleRequest>
type State = ArticlePayload & {
  inputTag: ''
}

// TODO: [Vue warn]: toRefs() expects a reactive object but received a plain one.
export default function useEditor() {
  const { redirect } = useContext()

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

  return {
    state: markRaw(state),
    setInitState,
    onEnterTag,
    removeTag,
    redirectBySuccess,
  }
}
