import { Fragment, useState } from 'react'

type DisplayFilter = 'ALL' | 'BRAND' | 'PERSONAL'
type ProjectType = 'brand' | 'art'

interface ProjectFilterProps {
  onFilterChange: (filter: ProjectType | 'ALL') => void
}

export default function ProjectFilter({ onFilterChange }: ProjectFilterProps) {
  const [activeFilter, setActiveFilter] = useState<DisplayFilter>('ALL')

  const filterMap: Record<DisplayFilter, ProjectType | 'ALL'> = {
    'BRAND': 'brand',
    'ALL': 'ALL',
    'PERSONAL': 'art'
  }

  const handleFilterClick = (displayFilter: DisplayFilter) => {
    setActiveFilter(displayFilter)
    onFilterChange(filterMap[displayFilter])
  }

  return (
    <div className="flex justify-center items-center gap-4 my-16">
      {(Object.keys(filterMap) as DisplayFilter[]).map((filter, index) => (
        <Fragment key={filter}>
          <button
            onClick={() => handleFilterClick(filter)}
            className={`
              text-xl transition-all duration-300 text-center
              hover:font-bold hover:cursor-pointer
              ${
                activeFilter === filter
                  ? 'font-bold tracking-[0.6em] mr-[-0.6em]'
                  : 'font-normal tracking-normal'
              }
            `}
          >
            {filter}
          </button>
          {index < Object.keys(filterMap).length - 1 && (
            <span className="text-gray-400 text-xl">|</span>
          )}
        </Fragment>
      ))}
    </div>
  )
}
