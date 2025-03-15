import Container from 'components/BlogContainer'
import BlogHeader from 'components/BlogHeader'
import Layout from 'components/BlogLayout'
import HeroProject from 'components/HeroProject'
import IndexPageHead from 'components/IndexPageHead'
import ProjectFilter from 'components/ProjectFilter'
import MoreStories from 'components/MoreStories'
import * as demo from 'lib/demo.data'
import type { Project, Settings } from 'lib/sanity.queries'
import { useState, useEffect } from 'react'
import ClientMarquee from './ClientMarquee'

export interface IndexPageProps {
  preview?: boolean
  loading?: boolean
  projects: Project[]
  settings: Settings
}

export default function IndexPage(props: IndexPageProps) {
  const { preview, loading, projects, settings } = props
  const [heroProject, ...moreProjects] = projects || []
  const { title = demo.title, description = demo.description } = settings || {}

  const [filteredProjects, setFilteredProjects] = useState(projects)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const handleFilterChange = (filter: 'ALL' | 'brand' | 'art') => {
    setIsTransitioning(true)
    // Small delay to allow fade out before changing projects
    setTimeout(() => {
      if (filter === 'ALL') {
        setFilteredProjects(projects)
      } else {
        setFilteredProjects(projects.filter(project => project.projectType === filter))
      }
      setIsTransitioning(false)
    }, 300)
  }

  const clients = [
    { name: 'Adobe', url: 'https://www.behance.net/gallery/83588137/Adobe-Pawtraits' },
    { name: 'Coca Cola', url: 'https://www.behance.net/gallery/132173859/Frozen-Coke' },
    { name: 'Coles', url: 'https://www.coles.com.au' },
    { name: 'Culture Amp', url: 'https://www.behance.net/gallery/125479807/Culture-Amp-Identity' },
    // { name: 'The Infectious Diseases Society of America', url: 'https://www.idsociety.org' },
    { name: 'Sydney Dogs & Cats Home', url: 'https://www.sydneydogsandcatshome.org' },
    { name: 'Story Cafe', url: 'https://www.forthepeople.agency/story-cafe' },
    { name: 'Womens\' & Girls Emergency Centre', url: 'https://www.wagec.org.au' },
  ]

  return (
    <>
      <IndexPageHead settings={settings} />

      <Layout preview={preview} loading={loading}>
        <Container>
          <BlogHeader title={title} description={description} level={1} />
          {/* {heroProject && (
            <HeroProject
              title={heroProject.title}
              coverImage={heroProject.coverImage}
              date={heroProject.date}
              slug={heroProject.slug}
              excerpt={heroProject.excerpt}
            />
          )} */}
          <ProjectFilter onFilterChange={handleFilterChange}/>
          <div className={`transition-opacity duration-200 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
            {projects.length > 0 && <MoreStories projects={filteredProjects} level={1} />}
          </div>
        </Container>
        <ClientMarquee clients={clients} />
      </Layout>
    </>
  )
}
