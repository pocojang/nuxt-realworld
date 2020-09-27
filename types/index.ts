interface User {
  email: string
  token: string
  username: string
  bio: string
  image: string
}

interface Profile {
  username: string
  bio: string
  image: string
  following: boolean
}

interface Author {
  username: string
  bio: string
  image: string
  following: false
}

type Tag = string

interface Article {
  slug: string
  title: string
  description: string
  body: string
  tagList: Tag[]
  createdAt: string
  updatedAt: string
  favorited: boolean
  favoritesCount: number
  author: Author
}

interface Comment {
  id: number
  createdAt: string
  updatedAt: string
  body: string
  author: Author
}
