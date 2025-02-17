import CoverImage from 'components/CoverImage'
import Date from 'components/PostDate'
import PostTitle from 'components/PostTitle'
import type { Post } from 'lib/sanity.queries'

export default function PostHeader(
  props: Pick<Post, 'title' | 'coverImage' | 'coverHidden' | 'date' | 'slug'>,
) {
  const { title, coverImage, coverHidden, date, slug } = props
  return (
    <>
      <PostTitle>{title}</PostTitle>
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
