<template>
  <nav>
    <ul class="pagination">
      <li
        v-for="(_, index) in totalPageArr"
        :key="index"
        class="page-item"
        :class="{ active: Number(index) === Number(currentPage) }"
      >
        <button class="page-link" @click="setPage(index)">
          {{ index + 1 }}
        </button>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent, toRefs, watch } from '@nuxtjs/composition-api'
import usePagination from '@/compositions/usePagination'

export default defineComponent({
  name: 'Pagination',
  props: {
    totalCount: {
      type: Number,
      required: true,
    },
  },
  setup(props, { emit }) {
    const { state, setPage, getOffset, totalPageArr } = usePagination(
      props.totalCount
    )

    console.log(props.totalCount)

    watch(
      () => state.currentPage,
      (currentPage) => {
        emit('fetch-data', getOffset(currentPage))
      }
    )

    return {
      ...toRefs(state),
      setPage,
      totalPageArr,
    }
  },
})
</script>
