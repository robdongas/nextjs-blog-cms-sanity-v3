import Avatar from 'components/AuthorAvatar'
import CoverImage from 'components/CoverImage'
import Date from 'components/PostDate'
import type { Post } from 'lib/sanity.queries'
import Link from 'next/link'

export default function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}: Omit<Post, '_id'>) {
  return (
    <div>
      <div className="mb-5 relative group">
        <div className="relative">
          <CoverImage
            slug={slug}
            title={title}
            image={coverImage}
            priority={false}
          />
        </div>
        <div className='absolute pointer-events-none inset-0 bg-gradient-to-b from-transparent to-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100'></div>
        <div className='absolute bottom-4 left-4 right-4 opacity-0 transform translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0'>
          <h3 className="text-3xl leading-snug text-balance text-white">
            <Link href={`/posts/${slug}`}>
              {title}
            </Link>
          </h3>
        </div>
      </div>
    </div>
  )
}
