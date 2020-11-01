import { CustomErrors } from '@/types'
import { onUnmounted, reactive } from '@nuxtjs/composition-api'

type State = Partial<CustomErrors>

const state = reactive<State>({
  errors: undefined,
})

export default function useError() {
  const setError = (errors: State['errors']) => {
    state.errors = errors
  }

  onUnmounted(() => {
    setError(undefined)
  })

  return {
    state,
    setError,
  }
}
