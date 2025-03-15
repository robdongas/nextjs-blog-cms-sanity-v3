/**
 * This component uses Portable Text to render a project body.
 *
 * You can learn more about Portable Text on:
 * https://www.sanity.io/docs/block-content
 * https://github.com/portabletext/react-portabletext
 * https://portabletext.org/
 *
 */
import { PortableText, type PortableTextReactComponents } from 'next-sanity'

import React, { useEffect } from 'react';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';

import { SanityImageLightbox } from './SanityImageLightbox'

const myPortableTextComponents: Partial<PortableTextReactComponents> = {
  types: {
    image: ({ value }) => {
      return (
        <SanityImageLightbox {...value} />
      );
    },
  },
}

export default function ProjectBody({ content }) {
  useEffect(() => {
    let lightbox = new PhotoSwipeLightbox({
      gallery: '.prose',
      children: 'a[data-pswp-width]',
      pswpModule: () => import('photoswipe'),
    });
    lightbox.init();

    return () => {
      lightbox.destroy();
      lightbox = null;
    };
  }, []);
  return (
    <div className="mx-auto max-w-2xl prose">
      <PortableText value={content} components={myPortableTextComponents} />
    </div>
  )
}
