import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { Tag, ResponseType } from '@/types'

export const tagRepository = (axios: NuxtAxiosInstance) => ({
  getTagList(): ResponseType<'tags', Tag[]> {
    return axios.$get('/tags')
  },
})

export type TagRepository = ReturnType<typeof tagRepository>
