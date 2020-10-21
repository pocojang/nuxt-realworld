import { DEFAULT_PROFILE_IMG } from '@/constants'

export default function useUtils() {
  const imageUrlAlt = (event: { target: HTMLImageElement }) => {
    event.target.src = DEFAULT_PROFILE_IMG
  }

  return { imageUrlAlt }
}
