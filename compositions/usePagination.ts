import { LIMIT_LIST_ITEM } from '@/constants'
import { computed, reactive } from '@nuxtjs/composition-api'

type State = {
  currentPage: number
}

export default function usePagination(totalCount: number) {
  const state = reactive<State>({
    currentPage: 0,
  })

  const totalPageArr = computed(() => {
    const length = totalCount / LIMIT_LIST_ITEM

    return Array.from({ length }, (_, i) => state.currentPage + i)
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
    totalPageArr,
  }
}
