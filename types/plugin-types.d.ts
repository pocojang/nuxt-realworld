import { Repository } from '@/api'

declare module 'vue/types/vue' {
  interface Vue {
    $repository: Repository
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $repository: Repository
  }
  interface Context {
    $repository: Repository
  }
}
