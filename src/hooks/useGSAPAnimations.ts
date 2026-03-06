import { useEffect, RefObject } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useRevealAnimation(
  elementRef: RefObject<HTMLElement>,
  options: {
    y?: number;
    opacity?: number;
    duration?: number;
    delay?: number;
    stagger?: number;
  } = {}
) {
  const { y = 60, opacity = 0, duration = 0.8, delay = 0, stagger = 0 } = options;

  useGSAP(() => {
    if (!elementRef.current) return;

    const children = elementRef.current.children;
    const targets = children.length > 0 ? Array.from(children) : elementRef.current;

    gsap.fromTo(
      targets,
      {
        y,
        opacity,
      },
      {
        y: 0,
        opacity: 1,
        duration,
        delay,
        stagger,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: elementRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, [elementRef]);
}

export function useParallax(
  elementRef: RefObject<HTMLElement>,
  speed: number = 0.5
) {
  useGSAP(() => {
    if (!elementRef.current) return;

    gsap.to(elementRef.current, {
      y: () => window.innerHeight * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: elementRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  }, [elementRef, speed]);
}

export function useClipReveal(elementRef: RefObject<HTMLElement>, delay: number = 0) {
  useGSAP(() => {
    if (!elementRef.current) return;

    gsap.fromTo(
      elementRef.current,
      {
        clipPath: 'inset(100% 0 0 0)',
      },
      {
        clipPath: 'inset(0 0 0 0)',
        duration: 1,
        delay,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: elementRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, [elementRef, delay]);
}

export function useScaleReveal(
  elementRef: RefObject<HTMLElement>,
  options: {
    scale?: number;
    duration?: number;
    delay?: number;
  } = {}
) {
  const { scale = 0, duration = 0.8, delay = 0 } = options;

  useGSAP(() => {
    if (!elementRef.current) return;

    gsap.fromTo(
      elementRef.current,
      {
        scale,
        opacity: 0,
      },
      {
        scale: 1,
        opacity: 1,
        duration,
        delay,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: elementRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, [elementRef, scale, duration, delay]);
}

export function useBatchReveal(
  containerRef: RefObject<HTMLElement>,
  selector: string,
  options: {
    y?: number;
    stagger?: number;
    duration?: number;
  } = {}
) {
  const { y = 60, stagger = 0.15, duration = 0.8 } = options;

  useGSAP(() => {
    if (!containerRef.current) return;

    ScrollTrigger.batch(containerRef.current.querySelectorAll(selector), {
      onEnter: (batch) => {
        gsap.fromTo(
          batch,
          {
            y,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration,
            stagger,
            ease: 'power2.out',
          }
        );
      },
      start: 'top 90%',
    });
  }, [containerRef, selector, y, stagger, duration]);
}

export function useMagneticButton(buttonRef: RefObject<HTMLElement>, strength: number = 0.3) {
  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(button, {
        x: x * strength,
        y: y * strength,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)',
      });
    };

    button.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      button.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [buttonRef, strength]);
}
