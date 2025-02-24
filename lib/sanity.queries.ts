import groq from 'groq'

const postFields = groq`
  _id,
  title,
  date,
  _updatedAt,
  excerpt,
  coverImage,
  coverHidden,
  projectType,
  "slug": slug.current,
`

export const settingsQuery = groq`*[_type == "settings"][0]`

export const indexQuery = groq`
*[_type == "post"] | order(date desc, _updatedAt desc) {
  ${postFields}
}`

export const postAndMoreStoriesQuery = groq`
{
  "post": *[_type == "post" && slug.current == $slug] | order(_updatedAt desc) [0] {
    content,
    ${postFields}
  },
  "morePosts": *[_type == "post" && slug.current != $slug] | order(date desc, _updatedAt desc) [0...4] {
    content,
    ${postFields}
  }
}`

export const postSlugsQuery = groq`
*[_type == "post" && defined(slug.current)][].slug.current
`

export const postBySlugQuery = groq`
*[_type == "post" && slug.current == $slug][0] {
  ${postFields}
}
`

export interface Post {
  _id: string
  title?: string
  coverImage?: any
  coverHidden: boolean
  date?: string
  _updatedAt?: string
  excerpt?: string
  slug?: string
  projectType: string
  content?: any
}

export interface Settings {
  title?: string
  description?: any[]
  ogImage?: {
    title?: string
  }
}
