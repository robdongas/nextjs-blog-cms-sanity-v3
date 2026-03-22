import { createClient, type SanityClient } from '@sanity/client'
import {
    apiVersion,
    dataset,
    projectId,
    useCdn,
} from './sanity.api'
import {
    type About,
    aboutQuery,
    indexQuery,
    type Project,
    projectAndMoreStoriesQuery,
    projectBySlugQuery,
    projectSlugsQuery,
    type Settings,
    settingsQuery,
} from './sanity.queries'

export function getClient(): SanityClient {
    return createClient({
        projectId,
        dataset,
        apiVersion,
        useCdn,
        perspective: 'published',
    })
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

export async function getAbout(client: SanityClient): Promise<About> {
    return (await client.fetch(aboutQuery)) || {}
}
