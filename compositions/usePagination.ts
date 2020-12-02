import { LIMIT_LIST_ITEM } from '@/constants'
import { reactive } from '@nuxtjs/composition-api'

type State = {
  currentPage: number
}

export default function usePagination() {
  const state = reactive<State>({
    currentPage: 0,
  })

  const setPage = (pageIndex: number) => {
    state.currentPage = pageIndex
  }

  const getOffset = (pageIndex: number) => {
    return LIMIT_LIST_ITEM * pageIndex
  }

  return {
    state,
    setPage,
    getOffset,
  }
}
