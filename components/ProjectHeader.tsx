import CoverImage from 'components/CoverImage'
import Date from 'components/ProjectDate'
import ProjectTitle from 'components/ProjectTitle'
import type { Project } from 'lib/sanity.queries'

export default function ProjectHeader(
  props: Pick<Project, 'title' | 'coverImage' | 'coverHidden' | 'date' | 'slug'>,
) {
  const { title, coverImage, coverHidden, date, slug } = props
  return (
    <>
      <ProjectTitle>{title}</ProjectTitle>
      <div className="mb-8 sm:mx-0 md:mb-16">
        {!coverHidden &&
          <CoverImage title={title} image={coverImage} priority slug={slug} />
        }
      </div>
      {/* <div className="mx-auto max-w-2xl">
        <div className="mb-6 text-lg">
          <Date dateString={date} />
        </div>
      </div> */}
    </>
  )
}
