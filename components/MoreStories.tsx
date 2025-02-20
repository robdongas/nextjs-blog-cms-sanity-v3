import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import PostPreview from 'components/PostPreview'
import type { Post } from 'lib/sanity.queries'

export default function MoreStories({ posts, level }: { posts: Post[], level: 1 | 2 }) {
  const postsRef = useRef<HTMLDivElement>(null)
  const [visualIndices, setVisualIndices] = useState<number[]>([])


  useEffect(() => {
    const elements = postsRef.current?.children
    if (!elements) return

    // Set initial state immediately
    gsap.set(elements, { opacity: 0, y: 20 })

    // Calculate visual indices and animate
    setTimeout(() => {
      const positions = Array.from(elements).map(el => {
        const rect = el.getBoundingClientRect()
        return {
          left: rect.left,
          top: rect.top,
          index: Array.from(elements).indexOf(el),
          element: el
        }
      })

      // Sort by visual position (top to bottom, left to right)
      positions.sort((a, b) => {
        const rowDiff = Math.round(a.top - b.top)
        if (Math.abs(rowDiff) > 10) return rowDiff
        return a.left - b.left
      })

      // Create mapping of original index to visual index
      const newIndices = new Array(posts.length)
      positions.forEach((pos, visualIndex) => {
        newIndices[pos.index] = visualIndex + 1
      })

      setVisualIndices(newIndices)

      // Animate elements in visual order
      positions.forEach((pos, i) => {
        gsap.to(pos.element, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          delay: i * 0.1
        })
      })
    }, 100)
  }, [posts])

  switch (level) {
    case 1:
      return (
        <section>
          <div ref={postsRef} className="mb-8 columns-1 gap-8 [column-fill:_balance] md:columns-2 lg:columns-3">
            {posts.map((post, index) => (
              <div key={post._id} className="break-inside-avoid inline-block w-full mb-4">
                <PostPreview
                  title={post.title}
                  projectType={post.projectType}
                  coverImage={post.coverImage}
                  coverHidden={post.coverHidden}
                  date={post.date}
                  slug={post.slug}
                  excerpt={post.excerpt}
                />
              </div>
            ))}
          </div>
        </section>
      )
    case 2:
      return (
        <section>
          <h2 className="mb-8 text-6xl font-bold leading-tight tracking-tighter md:text-7xl">
            More Work
          </h2>
          <div ref={postsRef} className="mb-32 columns-2 gap-8 [column-fill:_balance] md:columns-3 lg:columns-4">
            {posts.map((post) => (
              <div key={post._id} className="break-inside-avoid inline-block w-full mb-4">
                <PostPreview
                  title={post.title}
                  projectType={post.projectType}
                  coverImage={post.coverImage}
                  coverHidden={post.coverHidden}
                  date={post.date}
                  slug={post.slug}
                  excerpt={post.excerpt}
                />
              </div>
            ))}
          </div>
        </section>
      )
  }
}
