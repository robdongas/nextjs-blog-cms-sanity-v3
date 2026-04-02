import { urlForImage } from '../lib/sanity.image'

function getDimensionsFromRef(ref: string): { width: number; height: number } | null {
    const match = ref.match(/-(\d+)x(\d+)-/)
    if (!match) return null
    return { width: parseInt(match[1], 10), height: parseInt(match[2], 10) }
}

interface Props {
    asset: any
    alt: string
    caption?: string
}

export const SanityImageLightbox = (props: Props) => {
    const { asset, alt, caption } = props

    if (!asset?._ref && !asset?.url) return null

    const imageUrl = urlForImage(asset).url()
    const intrinsic = asset._ref ? getDimensionsFromRef(asset._ref) : null
    const width = intrinsic?.width ?? 2000
    const height = intrinsic?.height ?? Math.round(width * 0.75)

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
