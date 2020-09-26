import { NuxtAxiosInstance } from '@nuxtjs/axios'
import articleRepository from './articleRepository'
import commentRepository from './commentRepository'
import profileRepository from './profileRepository'
import tagRepository from './tagRepository'
import userRepository from './userRepository'

/**
 * @see https://axios.nuxtjs.org
 * @see https://github.com/gothinkster/realworld/tree/3155494efe68432772157de38a90c49b3698897f/api
 */
export default ($axios: NuxtAxiosInstance) => ({
  article: articleRepository($axios),
  comment: commentRepository($axios),
  profile: profileRepository($axios),
  tag: tagRepository($axios),
  user: userRepository($axios),
})
