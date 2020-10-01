import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { Tag, ResponseType } from '~/types'

export const tagRepository = (axios: NuxtAxiosInstance) => ({
  getTagList(): ResponseType<'tags', Tag[]> {
    // No authentication required, returns a List of Tags
    return axios.$get('/tags')
  },
})

export type TagRepository = ReturnType<typeof tagRepository>
