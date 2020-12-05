<template>
  <nav v-if="totalPageArr.length">
    <ul class="pagination">
      <li
        v-for="(_, index) in totalPageArr"
        :key="index"
        class="page-item"
        :class="{ active: Number(index) === Number(currentPage) }"
      >
        <button class="page-link" @click="handleSetPage(index)">
          {{ index + 1 }}
        </button>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs } from '@nuxtjs/composition-api'

import usePagination from '@/compositions/usePagination'
import { LIMIT_LIST_ITEM } from '@/constants'

export default defineComponent({
  name: 'Pagination',
  props: {
    totalCount: {
      type: Number,
      required: true,
    },
  },
  setup(props, { emit }) {
    const { state, setPage, getOffset } = usePagination()

    const totalPageArr = computed(() => {
      const length = props.totalCount / LIMIT_LIST_ITEM

      return Array.from({ length }, (_, i) => state.currentPage + i)
    })

    const handleSetPage = (pageIndex: number) => {
      emit('fetch-data', getOffset(pageIndex))
      setPage(pageIndex)
    }

    return {
      ...toRefs(state),
      handleSetPage,
      setPage,
      totalPageArr,
    }
  },
})
</script>
