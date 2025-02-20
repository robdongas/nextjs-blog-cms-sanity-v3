import { useEffect, useRef } from 'react'
import gsap from 'gsap'

interface ClientMarqueeProps {
    clients: Array<{
        name: string
        url: string
    }>
}

export default function ClientMarquee({ clients }: ClientMarqueeProps) {
    const marqueeRef = useRef<HTMLDivElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const animationRef = useRef<gsap.core.Tween>(null)

    useEffect(() => {
        const marquee = marqueeRef.current
        const content = contentRef.current
        if (!marquee || !content) return

        // Clone content for seamless loop
        const clone = content.cloneNode(true) as HTMLDivElement
        marquee.appendChild(clone)

        // Calculate total width for animation
        const totalWidth = content.scrollWidth;

        // Create animation
        animationRef.current = gsap.to([content, clone], {
            x: -totalWidth,
            repeat: -1,
            duration: totalWidth / 50, // Adjust speed based on total width
            ease: "none",
        })

        // Add hover handlers
        const handleMouseEnter = () => {
            gsap.to(animationRef.current, {
                timeScale: 0,
                duration: 0.5
            })
        }

        const handleMouseLeave = () => {
            gsap.to(animationRef.current, {
                timeScale: 1,
                duration: 0.5
            })
        }

        marquee.addEventListener('mouseenter', handleMouseEnter)
        marquee.addEventListener('mouseleave', handleMouseLeave)

        return () => {
            marquee.removeEventListener('mouseenter', handleMouseEnter)
            marquee.removeEventListener('mouseleave', handleMouseLeave)
        }
    }, [])

    return (
        <section>
            <div className="container mx-auto mb-8 ps-5 text-pretty">
                <h2 className="mb-8 text-6xl font-bold leading-tight tracking-tighter md:text-7xl">Clients</h2>
            </div>

            <div className="w-full py-8 overflow-hidden relative mb-8">
                {/* Edge fade gradients */}
                <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-white to-transparent z-10"></div>
                <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-white to-transparent z-10"></div>

                <div ref={marqueeRef} className="flex whitespace-nowrap">
                    <div ref={contentRef} className="flex justify-between items-center">
                        {clients.map((client, index) => (
                            <a
                                key={index}
                                href={client.url}
                                className="text-4xl font-light tracking-wider flex-none text-center hover:font-medium transition-all hover:underline"
                                style={{ margin: '0 3rem' }} // Using inline style for precise spacing
                            >
                                {client.name}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
} 