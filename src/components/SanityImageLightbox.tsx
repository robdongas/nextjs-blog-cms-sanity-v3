import { urlForImage } from '../lib/sanity.image'

interface Props {
    asset: any
    alt: string
    caption?: string
}

export const SanityImageLightbox = (props: Props) => {
    const { asset, alt, caption } = props

    if (!asset?._ref && !asset?.url) return null

    const imageUrl = urlForImage(asset).url()
    const width = urlForImage(asset).width(2000).url() ? 2000 : 800
    const height = Math.round(width * 0.75) // Approximate aspect ratio

    return (
        <a
            href={imageUrl}
            data-pswp-width={width}
            data-pswp-height={height}
            target="_blank"
        >
            <figure>
                <img
                    src={imageUrl}
                    alt={alt || ''}
                    loading="lazy"
                    style={{ width: '100%', height: 'auto' }}
                />
                {caption && (
                    <figcaption className="mt-2 text-center italic text-sm text-gray-500 dark:text-gray-400 text-pretty">
                        {caption}
                    </figcaption>
                )}
            </figure>
        </a>
    )
}
