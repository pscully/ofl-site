import { Link, useLocation } from 'react-router-dom';
import { Mic2, ShoppingBag, Menu, X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const mobileNavRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useGSAP(() => {
    if (!headerRef.current) return;

    if (isHomePage) {
      gsap.set(headerRef.current, { backgroundColor: 'rgba(42, 10, 10, 0)' });

      ScrollTrigger.create({
        start: 'top top',
        end: '100',
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.to(headerRef.current, {
            backgroundColor: `rgba(61, 16, 16, ${progress * 0.95})`,
            duration: 0.3,
          });
        },
      });
    } else {
      gsap.set(headerRef.current, { backgroundColor: 'rgba(61, 16, 16, 0.95)' });
    }

    let lastScrollY = 0;
    const showHeader = () => gsap.to(headerRef.current, { y: 0, duration: 0.3 });
    const hideHeader = () => gsap.to(headerRef.current, { y: -100, duration: 0.3 });

    ScrollTrigger.create({
      start: 'top top',
      end: 'max',
      onUpdate: (self) => {
        const currentScrollY = self.scroll();
        if (currentScrollY < 100) {
          showHeader();
        } else if (currentScrollY > lastScrollY) {
          hideHeader();
        } else {
          showHeader();
        }
        lastScrollY = currentScrollY;
      },
    });
  }, [isHomePage, location.pathname]);

  useEffect(() => {
    if (mobileMenuOpen && mobileNavRef.current) {
      gsap.fromTo(
        mobileNavRef.current,
        { height: 0, opacity: 0 },
        { height: 'auto', opacity: 1, duration: 0.3, ease: 'power2.out' }
      );

      const links = mobileNavRef.current.querySelectorAll('a');
      gsap.fromTo(
        links,
        { x: -20, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.3, stagger: 0.05, ease: 'power2.out' }
      );
    }
  }, [mobileMenuOpen]);

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm border-b border-brand-cream-400/20"
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-3 group">
            <Mic2 className="w-8 h-8 text-brand-gold-500 group-hover:text-brand-gold-400 transition-colors" />
            <span className="text-2xl font-serif font-bold text-brand-cream-100 group-hover:text-brand-gold-400 transition-colors">
              Old Fart
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/livin"
              className="text-brand-cream-200 hover:text-brand-gold-400 transition-colors font-medium"
            >
              Livin'
            </Link>
            <Link
              to="/golfin"
              className="text-brand-cream-200 hover:text-brand-gold-400 transition-colors font-medium"
            >
              Golfin'
            </Link>
            <Link
              to="/fishin"
              className="text-brand-cream-200 hover:text-brand-gold-400 transition-colors font-medium"
            >
              Fishin'
            </Link>
            <Link
              to="/shop"
              className="text-brand-cream-200 hover:text-brand-gold-400 transition-colors font-medium"
            >
              Shop
            </Link>
            <Link
              to="/crew"
              className="text-brand-cream-200 hover:text-brand-gold-400 transition-colors font-medium"
            >
              The Crew
            </Link>
            <Link
              to="/contact"
              className="text-brand-cream-200 hover:text-brand-gold-400 transition-colors font-medium"
            >
              Contact
            </Link>
            <Link
              to="/shop"
              className="flex items-center gap-2 bg-brand-gold-600 hover:bg-brand-gold-500 text-brand-maroon-950 px-4 py-2 rounded-lg transition-all hover:scale-105 font-medium"
            >
              <ShoppingBag className="w-4 h-4" />
              Shop
            </Link>
          </nav>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-brand-cream-100"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <nav ref={mobileNavRef} className="md:hidden py-6 border-t border-brand-cream-400/20 overflow-hidden">
            <div className="flex flex-col gap-4">
              <Link
                to="/livin"
                onClick={() => setMobileMenuOpen(false)}
                className="text-brand-cream-200 hover:text-brand-gold-400 transition-colors font-medium"
              >
                Livin'
              </Link>
              <Link
                to="/golfin"
                onClick={() => setMobileMenuOpen(false)}
                className="text-brand-cream-200 hover:text-brand-gold-400 transition-colors font-medium"
              >
                Golfin'
              </Link>
              <Link
                to="/fishin"
                onClick={() => setMobileMenuOpen(false)}
                className="text-brand-cream-200 hover:text-brand-gold-400 transition-colors font-medium"
              >
                Fishin'
              </Link>
              <Link
                to="/shop"
                onClick={() => setMobileMenuOpen(false)}
                className="text-brand-cream-200 hover:text-brand-gold-400 transition-colors font-medium"
              >
                Shop
              </Link>
              <Link
                to="/crew"
                onClick={() => setMobileMenuOpen(false)}
                className="text-brand-cream-200 hover:text-brand-gold-400 transition-colors font-medium"
              >
                The Crew
              </Link>
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="text-brand-cream-200 hover:text-brand-gold-400 transition-colors font-medium"
              >
                Contact
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
