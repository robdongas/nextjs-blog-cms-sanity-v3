import { useRef, useEffect } from 'react'
import gsap from 'gsap'

export default function CursorFollower() {
    const cursorRef = useRef<HTMLDivElement | null>(null)
    const tl = useRef<gsap.core.Timeline | null>(null)

    useEffect(() => {
        const cursor = cursorRef.current

        if (!cursor) return

        // Set initial opacity to 0
        gsap.set(cursor, { opacity: 0 })

        // Initialize the GSAP timeline
        tl.current = gsap.timeline({ paused: true })

        // Add animations to the timeline
        tl.current.to(cursor, {
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
        })
            .to(cursor, {
                scale: 1.5,
                duration: 0.3,
                ease: "power2.out",
            }, "<")

        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY, target } = e

            gsap.to(cursor, {
                x: clientX,
                y: clientY,
                duration: 0.1,
                ease: "power2.out",
            })

            if (cursor.style.opacity === '0') {
                tl.current.play()
            }

            const isTargetLinkOrBtn =
                target instanceof HTMLElement && (target.closest('a') || target.closest('button'))

            gsap.to(cursor, {
                // opacity: isTargetLinkOrBtn ? 0 : 1,
                backgroundColor: isTargetLinkOrBtn ? 'rgba(254, 208, 70, 1)' : 'rgba(144, 70, 254, 1)',
                duration: 0.3,
                ease: "power2.out",
            })
        }

        const handleMouseLeave = () => {
            gsap.to(cursor, {
                opacity: 0,
                duration: 0.5,
                ease: "power2.out",
            })
        }

        window.addEventListener('mousemove', handleMouseMove)
        window.addEventListener('mouseleave', handleMouseLeave)

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('mouseleave', handleMouseLeave)
        }
    }, [])

    return <div ref={cursorRef} className='cursor-follower' />
}
