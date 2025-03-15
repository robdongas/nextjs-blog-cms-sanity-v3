import Container from 'components/BlogContainer'
import BlogHeader from 'components/BlogHeader'
import Layout from 'components/BlogLayout'
import MoreStories from 'components/MoreStories'
import ProjectBody from 'components/ProjectBody'
import ProjectHeader from 'components/ProjectHeader'
import ProjectPageHead from 'components/ProjectPageHead'
import ProjectTitle from 'components/ProjectTitle'
import SectionSeparator from 'components/SectionSeparator'
import * as demo from 'lib/demo.data'
import type { Project, Settings } from 'lib/sanity.queries'
import Error from 'next/error'

export interface ProjectPageProps {
  preview?: boolean
  loading?: boolean
  project: Project
  moreProjects: Project[]
  settings: Settings
}

const NO_PROJECTS: Project[] = []

export default function ProjectPage(props: ProjectPageProps) {
  const { preview, loading, moreProjects = NO_PROJECTS, project, settings } = props
  const { title = demo.title } = settings || {}

  const slug = project?.slug

  if (!slug && !preview) {
    return <Error statusCode={404} />
  }

  console.log(project)

  return (
    <>
      <ProjectPageHead settings={settings} project={project} />

      <Layout preview={preview} loading={loading}>
        <Container>
          <BlogHeader title={title} level={2} />
          {preview && !project ? (
            <ProjectTitle>Loading…</ProjectTitle>
          ) : (
            <>
              <article>
                <ProjectHeader
                  title={project.title}
                  coverImage={project.coverImage}
                  coverHidden={project.coverHidden}
                  date={project.date}
                />
                <ProjectBody content={project.content} />
              </article>
              <SectionSeparator />
              {moreProjects?.length > 0 && <MoreStories projects={moreProjects} level={2}/>}
            </>
          )}
        </Container>
      </Layout>
    </>
  )
}
