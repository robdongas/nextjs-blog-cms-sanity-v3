import PostPreview from 'components/PostPreview'
import type { Post } from 'lib/sanity.queries'

export default function MoreStories({ posts, level }: { posts: Post[], level: 1 | 2 }) {
  switch (level) {
    case 1:
      return (
        <section>
          <div className="mb-32 columns-1 gap-8 [column-fill:_balance] md:columns-2 lg:columns-3">
            {posts.map((post) => (
              <div key={post._id} className="break-inside-avoid inline-block w-full mb-4">
                <PostPreview
                  title={post.title}
                  coverImage={post.coverImage}
                  date={post.date}
                  author={post.author}
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
          <div className="mb-32 columns-2 gap-8 [column-fill:_balance] md:columns-3 lg:columns-4">
            {posts.map((post) => (
              <div key={post._id} className="break-inside-avoid inline-block w-full mb-4">
                <PostPreview
                  title={post.title}
                  coverImage={post.coverImage}
                  date={post.date}
                  author={post.author}
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
