import { urlForImage } from '../lib/sanity.image'
import type { Project } from '../lib/sanity.queries'

export default function ProjectPreview({
    title,
    projectType,
    coverImage,
    coverHidden,
    date,
    excerpt,
    slug,
}: Omit<Project, '_id'>) {
    const hasImage = coverImage?.asset?._ref
    const imageUrl = hasImage ? urlForImage(coverImage).url() : null
    const width = coverImage?.dimensions?.width || 2000
    const height = coverImage?.dimensions?.height || 1000

    return (
        <div {...{ "project-type": `${projectType}` }}>
            <div className="relative group">
                <div className="relative">
                    {hasImage ? (
                        <a href={`/projects/${slug}`} aria-label={title} className='hover:cursor-none'>
                            <img
                                className="h-auto w-full"
                                src={imageUrl}
                                alt=""
                                width={width}
                                height={height}
                                loading="lazy"
                            />
                        </a>
                    ) : (
                        <div style={{ paddingTop: '50%', backgroundColor: '#ddd' }} />
                    )}
                </div>
                <div className='absolute pointer-events-none inset-0 bg-gradient-to-b from-transparent to-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100'></div>
                <div className='absolute pointer-events-none bottom-4 left-4 right-4 opacity-0 transform translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0'>
                    <h3 className="text-3xl leading-snug text-balance text-white">
                        <a href={`/projects/${slug}`} className='hover:cursor-none'>
                            {title}
                        </a>
                    </h3>
                </div>
            </div>
        </div>
    )
}
