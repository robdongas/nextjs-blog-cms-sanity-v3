import { useState } from 'react'
import ProjectFilter from './ProjectFilter'
import MoreStories from './MoreStories'
import ClientMarquee from './ClientMarquee'
import type { Project } from '../lib/sanity.queries'

interface IndexPageInteractiveProps {
    projects: Project[]
}

const clients = [
    { name: 'Adobe', url: 'https://www.behance.net/gallery/83588137/Adobe-Pawtraits' },
    { name: 'Coca Cola', url: 'https://www.behance.net/gallery/132173859/Frozen-Coke' },
    { name: 'Coles', url: 'https://www.coles.com.au' },
    { name: 'Culture Amp', url: 'https://www.behance.net/gallery/125479807/Culture-Amp-Identity' },
    { name: 'Sydney Dogs & Cats Home', url: 'https://www.sydneydogsandcatshome.org' },
    { name: 'Story Cafe', url: 'https://www.forthepeople.agency/story-cafe' },
    { name: "Womens' & Girls Emergency Centre", url: 'https://www.wagec.org.au' },
]

export default function IndexPageInteractive({ projects }: IndexPageInteractiveProps) {
    const [filteredProjects, setFilteredProjects] = useState(projects)
    const [isTransitioning, setIsTransitioning] = useState(false)

    const handleFilterChange = (filter: 'ALL' | 'brand' | 'art') => {
        setIsTransitioning(true)
        setTimeout(() => {
            if (filter === 'ALL') {
                setFilteredProjects(projects)
            } else {
                setFilteredProjects(projects.filter(project => project.projectType === filter))
            }
            setIsTransitioning(false)
        }, 300)
    }

    return (
        <>
            <ProjectFilter onFilterChange={handleFilterChange} />
            <div className={`container max-w-200 mx-auto transition-opacity duration-200 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
                {projects.length > 0 && <MoreStories projects={filteredProjects} level={1} />}
            </div>
            <ClientMarquee clients={clients} />
        </>
    )
}
