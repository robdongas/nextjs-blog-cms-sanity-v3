import IndexPage, { type IndexPageProps } from 'components/IndexPage'
import {
  indexQuery,
  type Project,
  type Settings,
  settingsQuery,
} from 'lib/sanity.queries'
import { useLiveQuery } from 'next-sanity/preview'

export default function PreviewIndexPage(props: IndexPageProps) {
  const [projects, loadingProjects] = useLiveQuery<Project[]>(props.projects, indexQuery)
  const [settings, loadingSettings] = useLiveQuery<Settings>(
    props.settings,
    settingsQuery,
  )

  return (
    <IndexPage
      preview
      loading={loadingProjects || loadingSettings}
      projects={projects || []}
      settings={settings || {}}
    />
  )
}
