'use client';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function CursorFollower() {
    const cursorRef = useRef<HTMLDivElement | null>(null);
    const tl = useRef<gsap.core.Timeline | null>(null); // Create a ref for the timeline

    useEffect(() => {
        const cursor = cursorRef.current;

        if (!cursor) return;

        // Set initial opacity to 0
        gsap.set(cursor, { opacity: 0 });

        // Initialize the GSAP timeline
        tl.current = gsap.timeline({ paused: true });

        // Add animations to the timeline
        tl.current.to(cursor, {
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
        })
        .to(cursor, {
            scale: 1.5, // Example of another property
            duration: 0.3,
            ease: "power2.out",
        }, "<"); // Start this animation at the same time as the previous one

        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY, target } = e;

            // Use GSAP to animate the position of the cursor follower
            gsap.to(cursor, {
                x: clientX,
                y: clientY,
                duration: 0.1, // Adjust duration for smooth movement
                ease: "power2.out",
            });

            // Show the cursor when it is moved for the first time
            if (cursor.style.opacity === '0') {
                tl.current.play(); // Play the timeline to fade in the cursor
            }

            // Check if the mouse is over a link or button
            const isTargetLinkOrBtn =
                target instanceof HTMLElement && (target.closest('a') || target.closest('button'));

            // Animate the cursor follower based on whether it's over a link or button
            gsap.to(cursor, {
                opacity: isTargetLinkOrBtn ? 0 : 1,
                scale: isTargetLinkOrBtn ? 2.5 : 1,
                duration: 0.3,
                ease: "power2.out",
            });
        };

        const handleMouseLeave = () => {
            gsap.to(cursor, {
                opacity: 0,
                duration: 0.5,
                ease: "power2.out",
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return <div ref={cursorRef} className='cursor-follower' />;
}