import { reactive, useContext } from '@nuxtjs/composition-api'
import { Tag } from '@/types'

type State = {
  tagList: Tag[]
}

const state = reactive<State>({
  tagList: [],
})

export default function useTag() {
  const { $repository } = useContext()

  const getTagList = async () => {
    const { tags } = await $repository.tag.getTagList()

    state.tagList = tags.filter((tag: Tag) =>
      String(tag).replace(/[\u200B-\u200D\uFEFF]/g, '')
    )
  }

  return {
    state,
    getTagList,
  }
}
