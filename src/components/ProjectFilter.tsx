import { useState } from 'react'

type DisplayFilter = 'ALL' | 'BRAND' | 'LOGOS' | 'PERSONAL'
type ProjectType = 'brand' | 'art' | 'logos'

interface ProjectFilterProps {
    onFilterChange: (filter: ProjectType | 'ALL') => void
}

const displayOrder: DisplayFilter[] = ['ALL', 'BRAND', 'LOGOS', 'PERSONAL']

export default function ProjectFilter({ onFilterChange }: ProjectFilterProps) {
    const [activeFilter, setActiveFilter] = useState<DisplayFilter>('ALL')

    const filterMap: Record<DisplayFilter, ProjectType | 'ALL'> = {
        ALL: 'ALL',
        BRAND: 'brand',
        PERSONAL: 'art',
        LOGOS: 'logos',
    }

    const handleFilterClick = (displayFilter: DisplayFilter) => {
        setActiveFilter(displayFilter)
        onFilterChange(filterMap[displayFilter])
    }

    return (
        <ul className="list-none flex flex-col my-8 p-0 m-0">
            {displayOrder.map((filter) => (
                <li key={filter}>
                    <button
                        type="button"
                        onClick={() => handleFilterClick(filter)}
                        className={`
              text-xl transition-all duration-300 text-center
              hover:font-bold hover:cursor-none
              ${activeFilter === filter
                                ? 'font-bold tracking-[0.6em] mr-[-0.6em]'
                                : 'font-normal tracking-normal'
                            }
            `}
                    >
                        {filter}
                    </button>
                </li>
            ))}
        </ul>
    )
}
