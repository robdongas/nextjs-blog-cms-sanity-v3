import ProjectPage from 'components/ProjectPage'
import PreviewProjectPage from 'components/PreviewProjectPage'
import { readToken } from 'lib/sanity.api'
import {
  getAllProjectsSlugs,
  getClient,
  getProjectAndMoreStories,
  getSettings,
} from 'lib/sanity.client'
import { Project, Settings, projectSlugsQuery } from 'lib/sanity.queries'
import { GetStaticProps } from 'next'
import type { SharedPageProps } from 'pages/_app'

interface PageProps extends SharedPageProps {
  project: Project
  moreProjects: Project[]
  settings?: Settings
}

interface Query {
  [key: string]: string
}

export default function ProjectSlugRoute(props: PageProps) {
  const { settings, project, moreProjects, draftMode } = props

  if (draftMode) {
    return (
      <PreviewProjectPage project={project} moreProjects={moreProjects} settings={settings} />
    )
  }

  return <ProjectPage project={project} moreProjects={moreProjects} settings={settings} />
}

export const getStaticProps: GetStaticProps<PageProps, Query> = async (ctx) => {
  const { draftMode = false, params = {} } = ctx
  const client = getClient(draftMode ? { token: readToken } : undefined)

  const [settings, { project, moreProjects }] = await Promise.all([
    getSettings(client),
    getProjectAndMoreStories(client, params.slug),
  ])

  if (!project) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      project,
      moreProjects,
      settings,
      draftMode,
      token: draftMode ? readToken : '',
    },
  }
}

export const getStaticPaths = async () => {
  const slugs = await getAllProjectsSlugs()

  return {
    paths: slugs?.map(({ slug }) => `/projects/${slug}`) || [],
    fallback: 'blocking',
  }
}
