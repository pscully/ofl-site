import { useState, useEffect, ReactElement, useRef } from 'react';
import { useLocation, useRoutes } from 'react-router-dom';
import { gsap } from 'gsap';
import { useSmoothScroll } from '../providers/SmoothScrollProvider';
import { HomePage } from '../pages/HomePage';
import { LivinPage } from '../pages/LivinPage';
import { GolfinPage } from '../pages/GolfinPage';
import { FishinPage } from '../pages/FishinPage';
import { ShopPage } from '../pages/ShopPage';
import { CrewPage } from '../pages/CrewPage';
import { ContactPage } from '../pages/ContactPage';

const routes = [
  { path: '/', element: <HomePage /> },
  { path: '/livin', element: <LivinPage /> },
  { path: '/golfin', element: <GolfinPage /> },
  { path: '/fishin', element: <FishinPage /> },
  { path: '/shop', element: <ShopPage /> },
  { path: '/crew', element: <CrewPage /> },
  { path: '/contact', element: <ContactPage /> },
];

export const TransitionedRoutes = () => {
  const location = useLocation();
  const { scrollTo } = useSmoothScroll();
  const element = useRoutes(routes, location);

  const [transitioningElement, setTransitioningElement] = useState<ReactElement | null>(element);
  const [previousLocation, setPreviousLocation] = useState(location);
  const containerRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      gsap.fromTo(
        containerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: 'power2.inOut' }
      );
      return;
    }

    if (location.pathname !== previousLocation.pathname) {
      scrollTo(0, { duration: 0.2 });
      gsap.timeline({
        onComplete: () => {
          setTransitioningElement(element);
          setPreviousLocation(location);
          gsap.fromTo(
            containerRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
          );
        },
      }).to(containerRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.4,
        ease: 'power2.in',
      });
    }
  }, [location, element, previousLocation, scrollTo]);

  return <div ref={containerRef}>{transitioningElement}</div>;
};
