import { CustomErrors } from '@/types'
import { reactive } from '@nuxtjs/composition-api'

type State = Partial<CustomErrors>

export default function useError() {
  const state = reactive<State>({
    errors: undefined,
  })

  const setError = (errors: State['errors']) => {
    state.errors = errors
  }

  return {
    state,
    setError,
  }
}
