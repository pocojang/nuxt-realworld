import { FeedType } from '@/compositions/useArticleList'
import { PostType } from '@/compositions/useProfileList'

type TabItems<T> = Readonly<
  {
    type: T
    name: string
  }[]
>

export type FeedTabItems = TabItems<FeedType>
export type PostTabItems = TabItems<PostType>

export const feedTypes: FeedTabItems = [
  {
    type: 'YOUR',
    name: 'Your Feed',
  },
  {
    type: 'GLOBAL',
    name: 'Global Feed',
  },
]

export const postTypes: PostTabItems = [
  {
    type: 'AUTHOR',
    name: 'My Posts',
  },
  {
    type: 'FAVORITED',
    name: 'Favorited Posts',
  },
]

export const DEFAULT_PROFILE_IMG =
  'https://static.productionready.io/images/smiley-cyrus.jpg'
