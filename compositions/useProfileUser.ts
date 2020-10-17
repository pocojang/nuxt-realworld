import { reactive, useContext } from '@nuxtjs/composition-api'
import { Profile, User } from '@/types'

type State = {
  profile: Profile
}

const initState = {
  profile: {
    username: '',
    bio: '',
    image: '',
    following: false,
  },
}

export default function useProfileUser() {
  const { $repository } = useContext()

  const state = reactive<State>(initState)

  const getProfile = async (userName: User['username']) => {
    const { profile } = await $repository.profile.getProfile(userName)

    state.profile = profile
  }

  const followUser = async (userName: User['username']) => {
    const { profile } = await $repository.profile.followUser(userName)

    state.profile = profile
  }

  const unFollowUser = async (userName: User['username']) => {
    const { profile } = await $repository.profile.unFollowUser(userName)

    state.profile = profile
  }

  return {
    state,
    getProfile,
    followUser,
    unFollowUser,
  }
}
