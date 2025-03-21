import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { getSanityImageConfig } from 'lib/sanity.client'
import Image from 'next/image'
import { useNextSanityImage } from 'next-sanity-image'

interface Props {
  asset: SanityImageSource
  alt: string
  caption?: string
}

export const SanityImageLightbox = (props: Props) => {
  const { asset, alt, caption } = props
  const imageProps = useNextSanityImage(getSanityImageConfig(), asset)

  if (!imageProps) return null

  console.log(imageProps)
  // const imageUrl = value?.asset?.url;
  // const imageWidth = value?.asset?.metadata?.dimensions?.width;
  // const imageHeight = value?.asset?.metadata?.dimensions?.height;
  

  return (
    <a
      href={imageProps.src}
      data-pswp-width={imageProps.width}
      data-pswp-height={imageProps.height}
      target="_blank"
    >
      <figure>
        <Image
          {...imageProps}
          alt={alt}
          sizes="(max-width: 800px) 100vw, 800px"
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
