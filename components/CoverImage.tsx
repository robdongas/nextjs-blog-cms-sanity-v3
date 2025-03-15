import cn from 'classnames'
import { urlForImage } from 'lib/sanity.image'
import Image from 'next/image'
import Link from 'next/link'

interface CoverImageProps {
  title: string
  slug?: string
  image: any
  priority?: boolean
}

export default function CoverImage(props: CoverImageProps) {
  const { title, slug, image: source, priority } = props
  const image = source?.asset?._ref ? (
    <div className='relative'>
      <Image
        className="h-auto w-full"
        width={source.dimensions?.width || 2000}
        height={source.dimensions?.height || 1000}
        alt=""
        src={urlForImage(source).url()}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority={priority}
      />
    </div>
  ) : (
    <div style={{ paddingTop: '50%', backgroundColor: '#ddd' }} />
  )

  return (
    <div className="sm:mx-0">
      {slug ? (
        <Link href={`/projects/${slug}`} aria-label={title}>
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  )
}
