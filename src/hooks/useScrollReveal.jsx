import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook for scroll-triggered reveal animations.
 * Uses Intersection Observer API for performant scroll detection.
 */
export function useScrollReveal(options = {}) {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(element); // Only trigger once
                }
            },
            {
                threshold: options.threshold || 0.1,
                rootMargin: options.rootMargin || '0px 0px -50px 0px',
            }
        );

        observer.observe(element);
        return () => observer.disconnect();
    }, [options.threshold, options.rootMargin]);

    return [ref, isVisible];
}

/**
 * ScrollReveal wrapper component for easy use.
 * Supports multiple animation styles: fade-up, fade-left, fade-right, scale, blur
 */
export function ScrollReveal({
    children,
    animation = 'fade-up',
    delay = 0,
    duration = 0.7,
    className = '',
    threshold = 0.1,
}) {
    const [ref, isVisible] = useScrollReveal({ threshold });

    const animationStyles = {
        'fade-up': {
            hidden: { opacity: 0, transform: 'translateY(50px)' },
            visible: { opacity: 1, transform: 'translateY(0)' },
        },
        'fade-down': {
            hidden: { opacity: 0, transform: 'translateY(-50px)' },
            visible: { opacity: 1, transform: 'translateY(0)' },
        },
        'fade-left': {
            hidden: { opacity: 0, transform: 'translateX(-50px)' },
            visible: { opacity: 1, transform: 'translateX(0)' },
        },
        'fade-right': {
            hidden: { opacity: 0, transform: 'translateX(50px)' },
            visible: { opacity: 1, transform: 'translateX(0)' },
        },
        'scale': {
            hidden: { opacity: 0, transform: 'scale(0.85)' },
            visible: { opacity: 1, transform: 'scale(1)' },
        },
        'blur': {
            hidden: { opacity: 0, filter: 'blur(10px)', transform: 'translateY(20px)' },
            visible: { opacity: 1, filter: 'blur(0px)', transform: 'translateY(0)' },
        },
        'rotate': {
            hidden: { opacity: 0, transform: 'rotate(-5deg) translateY(30px)' },
            visible: { opacity: 1, transform: 'rotate(0deg) translateY(0)' },
        },
    };

    const style = animationStyles[animation] || animationStyles['fade-up'];

    return (
        <div
            ref={ref}
            className={className}
            style={{
                ...(isVisible ? style.visible : style.hidden),
                transition: `all ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
                willChange: 'transform, opacity, filter',
            }}
        >
            {children}
        </div>
    );
}

/**
 * Staggered animation for lists of items.
 */
export function StaggerReveal({
    children,
    staggerDelay = 0.08,
    animation = 'fade-up',
    className = '',
    threshold = 0.05,
}) {
    const [ref, isVisible] = useScrollReveal({ threshold });

    const items = Array.isArray(children) ? children : [children];

    const animationStyles = {
        'fade-up': {
            hidden: { opacity: 0, transform: 'translateY(40px)' },
            visible: { opacity: 1, transform: 'translateY(0)' },
        },
        'scale': {
            hidden: { opacity: 0, transform: 'scale(0.8)' },
            visible: { opacity: 1, transform: 'scale(1)' },
        },
    };

    const style = animationStyles[animation] || animationStyles['fade-up'];

    return (
        <div ref={ref} className={className}>
            {items.map((child, i) => (
                <div
                    key={i}
                    style={{
                        ...(isVisible ? style.visible : style.hidden),
                        transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${i * staggerDelay}s`,
                        willChange: 'transform, opacity',
                    }}
                >
                    {child}
                </div>
            ))}
        </div>
    );
}

export default ScrollReveal;
