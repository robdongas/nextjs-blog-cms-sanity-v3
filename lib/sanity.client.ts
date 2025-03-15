import {
  apiVersion,
  dataset,
  projectId,
  studioUrl,
  useCdn,
} from 'lib/sanity.api'
import {
  indexQuery,
  type Project,
  projectAndMoreStoriesQuery,
  projectBySlugQuery,
  projectSlugsQuery,
  type Settings,
  settingsQuery,
} from 'lib/sanity.queries'
import { createClient, type SanityClient } from 'next-sanity'

export function getClient(preview?: { token: string }): SanityClient {
  const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn,
    perspective: 'published',
    stega: {
      enabled: preview?.token ? true : false,
      studioUrl,
    },
  })
  if (preview) {
    if (!preview.token) {
      throw new Error('You must provide a token to preview drafts')
    }
    return client.withConfig({
      token: preview.token,
      useCdn: false,
      ignoreBrowserTokenWarning: true,
      perspective: 'drafts',
    })
  }
  return client
}

export const getSanityImageConfig = () => getClient()

export async function getSettings(client: SanityClient): Promise<Settings> {
  return (await client.fetch(settingsQuery)) || {}
}

export async function getAllProjects(client: SanityClient): Promise<Project[]> {
  return (await client.fetch(indexQuery)) || []
}

export async function getAllProjectsSlugs(): Promise<Pick<Project, 'slug'>[]> {
  const client = getClient()
  const slugs = (await client.fetch<string[]>(projectSlugsQuery)) || []
  return slugs.map((slug) => ({ slug }))
}

export async function getProjectBySlug(
  client: SanityClient,
  slug: string,
): Promise<Project> {
  return (await client.fetch(projectBySlugQuery, { slug })) || ({} as any)
}

export async function getProjectAndMoreStories(
  client: SanityClient,
  slug: string,
): Promise<{ project: Project; moreProjects: Project[] }> {
  return await client.fetch(projectAndMoreStoriesQuery, { slug })
}
