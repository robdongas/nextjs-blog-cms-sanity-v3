import CoverImage from 'components/CoverImage'
import Date from 'components/PostDate'
import type { Post } from 'lib/sanity.queries'
import Link from 'next/link'

export default function HeroPost(
  props: Pick<
    Post,
    'title' | 'coverImage' | 'date' | 'excerpt' | 'slug'
  >,
) {
  const { title, coverImage, date, excerpt, slug } = props
  return (
    <section>
      <div className="mb-8 md:mb-16 relative group">
        <CoverImage slug={slug} title={title} image={coverImage} priority />
        <div className='absolute inset-0 bg-gradient-to-b from-transparent to-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100'></div>
        <div className='absolute bottom-4 left-4 right-4 opacity-0 transform translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0'>
          <h3 className="text-4xl leading-tight lg:text-6xl text-balance text-white">
            <Link href={`/posts/${slug}`}>
              {title || 'Untitled'}
            </Link>
          </h3>
        </div>
      </div>
      {/* <div className="mb-20 md:mb-28 md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8">
        <div>

          <div className="mb-4 text-lg md:mb-0">
            <Date dateString={date} />
          </div>
        </div>
        <div>
          {excerpt && (
            <p className="mb-4 text-lg leading-relaxed text-pretty">
              {excerpt}
            </p>
          )}
        </div>
      </div> */}
    </section>
  )
}
