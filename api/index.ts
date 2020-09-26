import { NuxtAxiosInstance } from '@nuxtjs/axios'
import userRepository from './userRepository'

/**
 * @see https://github.com/gothinkster/realworld/tree/3155494efe68432772157de38a90c49b3698897f/api
 */
export default ($axios: NuxtAxiosInstance) => ({
  user: userRepository($axios),
})
