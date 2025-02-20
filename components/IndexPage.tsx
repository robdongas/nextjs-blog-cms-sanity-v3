import Container from 'components/BlogContainer'
import BlogHeader from 'components/BlogHeader'
import Layout from 'components/BlogLayout'
import HeroPost from 'components/HeroPost'
import IndexPageHead from 'components/IndexPageHead'
import PostFilter from 'components/PostFilter'
import MoreStories from 'components/MoreStories'
import * as demo from 'lib/demo.data'
import type { Post, Settings } from 'lib/sanity.queries'
import { useState, useEffect } from 'react'

export interface IndexPageProps {
  preview?: boolean
  loading?: boolean
  posts: Post[]
  settings: Settings
}

export default function IndexPage(props: IndexPageProps) {
  const { preview, loading, posts, settings } = props
  const [heroPost, ...morePosts] = posts || []
  const { title = demo.title, description = demo.description } = settings || {}

  const [filteredPosts, setFilteredPosts] = useState(posts)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const handleFilterChange = (filter: 'ALL' | 'brand' | 'art') => {
    setIsTransitioning(true)
    // Small delay to allow fade out before changing posts
    setTimeout(() => {
      if (filter === 'ALL') {
        setFilteredPosts(posts)
      } else {
        setFilteredPosts(posts.filter(post => post.projectType === filter))
      }
      setIsTransitioning(false)
    }, 300)
  }

  return (
    <>
      <IndexPageHead settings={settings} />

      <Layout preview={preview} loading={loading}>
        <Container>
          <BlogHeader title={title} description={description} level={1} />
          {/* {heroPost && (
            <HeroPost
              title={heroPost.title}
              coverImage={heroPost.coverImage}
              date={heroPost.date}
              slug={heroPost.slug}
              excerpt={heroPost.excerpt}
            />
          )} */}
          <PostFilter onFilterChange={handleFilterChange}/>
          <div className={`transition-opacity duration-200 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
            {posts.length > 0 && <MoreStories posts={filteredPosts} level={1} />}
          </div>
        </Container>
      </Layout>
    </>
  )
}
