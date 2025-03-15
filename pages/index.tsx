import IndexPage from 'components/IndexPage'
import PreviewIndexPage from 'components/PreviewIndexPage'
import { readToken } from 'lib/sanity.api'
import { getAllProjects, getClient, getSettings } from 'lib/sanity.client'
import { Project, Settings } from 'lib/sanity.queries'
import { GetStaticProps } from 'next'
import type { SharedPageProps } from 'pages/_app'

interface PageProps extends SharedPageProps {
  projects: Project[]
  settings: Settings
}

interface Query {
  [key: string]: string
}

export default function Page(props: PageProps) {
  const { projects, settings, draftMode } = props

  if (draftMode) {
    return <PreviewIndexPage projects={projects} settings={settings} />
  }

  return <IndexPage projects={projects} settings={settings} />
}

export const getStaticProps: GetStaticProps<PageProps, Query> = async (ctx) => {
  const { draftMode = false } = ctx
  const client = getClient(draftMode ? { token: readToken } : undefined)

  const [settings, projects = []] = await Promise.all([
    getSettings(client),
    getAllProjects(client),
  ])

  return {
    props: {
      projects,
      settings,
      draftMode,
      token: draftMode ? readToken : '',
    },
  }
}
