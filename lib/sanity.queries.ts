import groq from 'groq'

const projectFields = groq`
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
*[_type == "project"] | order(date desc, _updatedAt desc) {
  ${projectFields}
}`

export const projectAndMoreStoriesQuery = groq`
{
  "project": *[_type == "project" && slug.current == $slug] | order(_updatedAt desc) [0] {
    content,
    ${projectFields}
  },
  "moreProjects": *[_type == "project" && slug.current != $slug] | order(date desc, _updatedAt desc) [0...4] {
    content,
    ${projectFields}
  }
}`

export const projectSlugsQuery = groq`
*[_type == "project" && defined(slug.current)][].slug.current
`

export const projectBySlugQuery = groq`
*[_type == "project" && slug.current == $slug][0] {
  ${projectFields}
}
`

export interface Project {
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
