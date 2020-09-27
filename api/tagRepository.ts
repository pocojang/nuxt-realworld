import { NuxtAxiosInstance } from '@nuxtjs/axios'

// TODO: Response Model Typing
export const tagRepository = (axios: NuxtAxiosInstance) => ({
  getTagList() {
    // No authentication required, returns a List of Tags
    return axios.$get('/tags')
  },
})

export type TagRepository = ReturnType<typeof tagRepository>
