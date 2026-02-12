import ProjectPage, { ProjectPageProps } from 'components/ProjectPage'
import {
  type Project,
  projectAndMoreStoriesQuery,
  Settings,
  settingsQuery,
} from 'lib/sanity.queries'
import { useLiveQuery } from '@sanity/preview-kit'

export default function PreviewProjectPage(props: ProjectPageProps) {
  const [{ project: projectPreview, moreProjects }, loadingProject] = useLiveQuery<{
    project: Project
    moreProjects: Project[]
  }>(
    { project: props.project, moreProjects: props.moreProjects },
    projectAndMoreStoriesQuery,
    {
      slug: props.project.slug,
    },
  )
  const [settings, loadingSettings] = useLiveQuery<Settings>(
    props.settings,
    settingsQuery,
  )

  return (
    <ProjectPage
      preview
      loading={loadingProject || loadingSettings}
      project={projectPreview}
      moreProjects={moreProjects}
      settings={settings}
    />
  )
}
