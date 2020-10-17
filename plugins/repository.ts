import { Plugin } from '@nuxt/types'

import createRepository from '@/api/createRepository'

const repository: Plugin = (ctx, inject) => {
  const repositoryWithAxios = createRepository(ctx)

  inject('repository', repositoryWithAxios)
}

export default repository
