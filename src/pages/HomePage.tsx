import { ShoppingBag, ArrowRight, Mail } from 'lucide-react';
import { Button } from '../components/Button';
import { useState, useRef } from 'react';
import { supabase } from '../lib/supabase';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import heroVideo from '../assets/hero-video.mp4';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import mapImage from '../assets/map.webp';

gsap.registerPlugin(ScrollTrigger);

export function HomePage() {
  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const heroRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const mediaRef = useRef<HTMLSpanElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  const mapIntroRef = useRef<HTMLElement>(null);
  const mapTextRef = useRef<HTMLHeadingElement>(null);
  const mapArrowRef = useRef<HTMLDivElement>(null);
  const mapPinRef = useRef<HTMLElement>(null);
  const mapClipRef = useRef<HTMLDivElement>(null);
  const mapImageRef = useRef<HTMLDivElement>(null);

  const h1Ref = useRef<HTMLAnchorElement>(null);
  const h2Ref = useRef<HTMLAnchorElement>(null);
  const h3Ref = useRef<HTMLAnchorElement>(null);
  const h4Ref = useRef<HTMLAnchorElement>(null);
  const h5Ref = useRef<HTMLAnchorElement>(null);

  const merchSectionRef = useRef<HTMLElement>(null);

  const newsletterRef = useRef<HTMLElement>(null);

  // Hero entrance animations
  useGSAP(() => {
    // Lock initial state before first paint to prevent FOUC
    gsap.set(badgeRef.current, { scale: 0, opacity: 0 });
    const titleSpan = titleRef.current?.querySelector('span:first-child');
    if (titleSpan) gsap.set(titleSpan, { y: 40, opacity: 0 });
    gsap.set(mediaRef.current, { scale: 0.8, opacity: 0 });
    gsap.set(taglineRef.current, { y: 20, opacity: 0 });
    gsap.set(ctaRef.current?.children || [], { y: 30, opacity: 0 });

    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

    tl.to(badgeRef.current, {
      scale: 1,
      opacity: 1,
      duration: 0.8,
      ease: 'back.out(1.7)',
    })
      .to(titleSpan!, {
        y: 0,
        opacity: 1,
        duration: 0.8,
      }, '-=0.15')
      .to(mediaRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.7,
      }, '-=0.15')
      .to(taglineRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.8,
      }, '-=0.15')
      .to(ctaRef.current?.children || [], {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.2,
      }, '-=0.15');

    gsap.to(scrollIndicatorRef.current, {
      y: 10,
      duration: 1.5,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut',
    });

    gsap.to(heroRef.current, {
      opacity: 0,
      y: -100,
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.6,
      },
    });
  }, []);

  // New Map Scroll Animation
  useGSAP(() => {
    if (!mapIntroRef.current || !mapPinRef.current || !mapClipRef.current) return;

    // 1. Arrow extending down (curved path draw effect)
    gsap.fromTo(mapArrowRef.current,
      { clipPath: 'inset(0% 0% 100% 0%)' },
      {
        clipPath: 'inset(0% 0% 0% 0%)',
        ease: 'none',
        scrollTrigger: {
          trigger: mapIntroRef.current,
          start: 'top 75%',
          end: 'bottom 35%', // End slightly earlier so the tip finishes before the map
          scrub: true,
        }
      }
    );

    // 2. Map pin sequence
    const hotspots = [h1Ref.current, h2Ref.current, h3Ref.current, h4Ref.current, h5Ref.current];
    gsap.set(hotspots, { scale: 0, opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: mapPinRef.current,
        start: 'top top',
        end: '+=400%', // Lots of scroll room for sequence
        pin: true,
        scrub: 0.5,
      },
    });

    // Zoom map smoothly to fullscreen by animating CSS variables
    tl.to(mapClipRef.current, {
      '--clip-inset': '0%',
      '--clip-radius': '0px',
      duration: 1.5,
      ease: 'power2.inOut',
    }, 0);

    // Also slowly scale the inner image wrapper to create a zoom feel without losing edges
    gsap.fromTo(mapImageRef.current,
      { scale: 1.15 },
      {
        scale: 1,
        duration: 1.5,
        ease: 'power2.inOut'
      }
    );

    // Reveal hotspots one by one
    hotspots.forEach((hs) => {
      tl.to(hs, {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        ease: 'back.out(1.5)'
      }, "-=0.3");
    });

    // Add a trailing pause so user stays in the map briefly before next section
    // Extended from 0.5 to 2.0 to give ample time on "The Bar" before unpinning
    tl.to({}, { duration: 2.0 });
  }, []);

  // Merch section entrance animation
  useGSAP(() => {
    if (!merchSectionRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: merchSectionRef.current,
        // Start animation earlier (when top hits 90% of screen) to ensure it finishes before footer
        start: 'top 90%',
        toggleActions: 'play none none none',
      },
    });

    tl.from(merchSectionRef.current.querySelector('.merch-icon'), {
      y: -50,
      opacity: 0,
      duration: 0.6, // Sped up from 1.0
      ease: 'power3.out',
    })
      .from(merchSectionRef.current.querySelector('h2'), {
        clipPath: 'inset(100% 0 0 0)',
        duration: 0.6, // Sped up from 0.8
      }, '-=0.3')
      .from(merchSectionRef.current.querySelector('.merch-tagline'), {
        y: 20,
        opacity: 0,
        duration: 0.4, // Sped up from 0.6
      }, '-=0.3')
      .from(merchSectionRef.current.querySelectorAll('.merch-cards > div'), {
        y: 40,
        opacity: 0,
        duration: 0.4, // Sped up from 0.6
        stagger: 0.15, // Faster stagger
      }, '-=0.2')
      .from(merchSectionRef.current.querySelector('.merch-cta'), {
        y: 20,
        opacity: 0,
        duration: 0.4, // Sped up from 0.5
      }, '-=0.1');
  }, []);

  // Newsletter entrance animation
  useGSAP(() => {
    if (!newsletterRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: newsletterRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });

    tl.from(newsletterRef.current.querySelector('.mail-icon'), {
      y: -50,
      opacity: 0,
      duration: 1.0,
      ease: 'power3.out',
    })
      .from(newsletterRef.current.querySelector('h2'), {
        clipPath: 'inset(100% 0 0 0)',
        duration: 0.8,
      }, '-=0.4')
      .from(newsletterRef.current.querySelector('p'), {
        y: 20,
        opacity: 0,
        duration: 0.6,
      }, '-=0.4')
      .from(newsletterRef.current.querySelector('form'), {
        y: 20,
        opacity: 0,
        duration: 0.7,
      }, '-=0.3');

    gsap.to(newsletterRef.current.querySelector('.mail-icon'), {
      y: -10,
      duration: 2,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut',
    });
  }, []);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) return;

    setSubscribeStatus('loading');

    try {
      const { error } = await supabase
        .from('subscribers')
        .insert([{ email }]);

      if (error) throw error;

      setSubscribeStatus('success');
      setEmail('');
      setTimeout(() => setSubscribeStatus('idle'), 3000);
    } catch (error) {
      console.error('Error subscribing:', error);
      setSubscribeStatus('error');
      setTimeout(() => setSubscribeStatus('idle'), 3000);
    }
  };

  return (
    <div className="overflow-hidden bg-brand-maroon-950">
      {/* Hero */}
      <section ref={heroRef} className="gpu-accelerated relative min-h-screen flex items-center justify-center overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover scale-[1.15]"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-brand-maroon-950/80"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-brand-maroon-950/50"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div
              ref={badgeRef}
              className="gpu-accelerated inline-block mb-6 px-4 py-2 bg-brand-gold-600/20 border border-brand-gold-500/30 rounded-full"
            >
              <span className="text-brand-gold-400 text-sm font-medium">New Conversations Weekly</span>
            </div>

            <h1
              ref={titleRef}
              className="gpu-accelerated text-5xl md:text-7xl font-serif font-bold text-brand-cream-100 mb-6 text-shadow-glow"
            >
              <span>Old Fart </span>
              <span ref={mediaRef} className="bg-gradient-to-r from-brand-gold-400 to-brand-gold-600 bg-clip-text text-transparent">
                Media
              </span>
            </h1>

            <p
              ref={taglineRef}
              className="gpu-accelerated text-xl md:text-2xl text-brand-cream-200 mb-12 leading-relaxed"
            >
              Three shows. One mission: Living life, talking golf, and catching fish.
            </p>

            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="gpu-accelerated">
                <Button
                  size="lg"
                  onClick={() => document.getElementById('map')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Explore The Old Fart World
                </Button>
              </div>
              <div className="gpu-accelerated">
                <Button size="lg" variant="outline" to="/shop">
                  Shop Old Fart Merch
                </Button>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* Intro to Map */}
      <section ref={mapIntroRef} className="pt-24 bg-brand-maroon-950 flex flex-col items-center justify-center relative z-10" id="map">
        <h2 ref={mapTextRef} className="text-4xl md:text-6xl font-serif font-bold text-center text-brand-cream-100">
          Explore The Old Fart World
        </h2>

        {/* Beautiful curved SVG dashed S-arrow */}
        <div ref={mapArrowRef} className="mt-12 mb-6 h-64 flex justify-center w-full relative z-10">
          <svg
            viewBox="0 0 100 200"
            className="w-32 h-full text-brand-gold-500 overflow-visible drop-shadow-[0_0_8px_rgba(212,181,150,0.5)]"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path
              d="M 50,0 C 120,30 120,60 50,90 C -20,120 50,140 50,165"
              strokeDasharray="6 8"
            />
            {/* Solid tail stem guarantees perfect intersection with the arrowhead */}
            <path
              d="M 50,165 L 50,190 M 35,175 L 50,190 L 65,175"
            />
          </svg>
        </div>
      </section>

      {/* Pinned Map Sequence */}
      <section ref={mapPinRef} className="relative h-screen bg-brand-maroon-950 overflow-hidden flex items-center justify-center pb-12">
        <div
          ref={mapClipRef}
          /* Set inset-0 so the map wrapper stretches exactly to the screen edges, fully hiding the maroon container beneath */
          className="absolute inset-x-0 inset-y-8 w-full h-[calc(100%-4rem)] will-change-transform z-0 flex items-center justify-center overflow-hidden"
          style={{
            '--clip-inset': '15%',
            '--clip-radius': '32px',
            clipPath: 'inset(var(--clip-inset) var(--clip-inset) var(--clip-inset) var(--clip-inset) round var(--clip-radius))'
          } as React.CSSProperties}
        >
          {/* This wrapper mathematically mimics object-cover to completely eliminate letterboxing, but holds exact coordinates. 
              Using top 45% (instead of 50%) keeps the top buildings (Pro Shop, Podcast) safely in the frame even when the bottom overflows. */}
          <div
            ref={mapImageRef}
            className="absolute will-change-transform flex-shrink-0"
            style={{
              width: 'max(100vw, calc(100vh * 2200/1475))',
              height: 'max(100vh, calc(100vw * 1475/2200))',
              left: '50%',
              top: '45%',
              transform: 'translate(-50%, -45%)'
            }}
          >
            <img
              src={mapImage}
              alt="Old Fart World Map"
              className="absolute inset-0 w-full h-full object-contain"
            />

            {/* 1. Podcast Studio */}
            <a
              ref={h1Ref}
              href="/livin"
              className="absolute flex flex-col items-center hover:scale-110 transition-transform duration-300 cursor-pointer group z-10"
              style={{ left: '72%', top: '15%', transform: 'translate(-50%, -50%)' }}
            >
              <div className="relative w-8 h-8 rounded-full mb-2 bg-brand-maroon-500 shadow-[0_0_15px_rgba(159,18,57,0.6)] border-2 border-brand-cream-100 flex items-center justify-center">
                <div className="absolute inset-0 bg-brand-maroon-400 rounded-full animate-ping opacity-75"></div>
                <div className="w-2 h-2 bg-brand-cream-100 rounded-full"></div>
              </div>
              <span className="text-sm font-bold text-brand-cream-100 bg-brand-maroon-900/95 border border-brand-gold-500/30 px-4 py-2 rounded-full whitespace-nowrap shadow-xl">
                Podcast Studio
              </span>
            </a>

            {/* 2. Pro Shop */}
            <a
              ref={h2Ref}
              href="/shop"
              className="absolute flex flex-col items-center hover:scale-110 transition-transform duration-300 cursor-pointer group z-10"
              style={{ left: '85%', top: '15%', transform: 'translate(-50%, -50%)' }}
            >
              <div className="relative w-8 h-8 rounded-full mb-2 bg-brand-maroon-500 shadow-[0_0_15px_rgba(159,18,57,0.6)] border-2 border-brand-cream-100 flex items-center justify-center">
                <div className="absolute inset-0 bg-brand-maroon-400 rounded-full animate-ping opacity-75"></div>
                <div className="w-2 h-2 bg-brand-cream-100 rounded-full"></div>
              </div>
              <span className="text-sm font-bold text-brand-cream-100 bg-brand-maroon-900/95 border border-brand-gold-500/30 px-4 py-2 rounded-full whitespace-nowrap shadow-xl">
                Pro Shop
              </span>
            </a>

            {/* 3. Bait Shop */}
            <a
              ref={h3Ref}
              href="/fishin"
              className="absolute flex flex-col items-center hover:scale-110 transition-transform duration-300 cursor-pointer group z-10"
              style={{ left: '96%', top: '48%', transform: 'translate(-50%, -50%)' }}
            >
              <div className="relative w-8 h-8 rounded-full mb-2 bg-brand-maroon-500 shadow-[0_0_15px_rgba(159,18,57,0.6)] border-2 border-brand-cream-100 flex items-center justify-center">
                <div className="absolute inset-0 bg-brand-maroon-400 rounded-full animate-ping opacity-75"></div>
                <div className="w-2 h-2 bg-brand-cream-100 rounded-full"></div>
              </div>
              <span className="text-sm font-bold text-brand-cream-100 bg-brand-maroon-900/95 border border-brand-gold-500/30 px-4 py-2 rounded-full whitespace-nowrap shadow-xl">
                Bait Shop
              </span>
            </a>

            {/* 4. Practice Putting Green */}
            <a
              ref={h4Ref}
              href="/golfin"
              className="absolute flex flex-col items-center hover:scale-110 transition-transform duration-300 cursor-pointer group z-10"
              style={{ left: '48%', top: '42%', transform: 'translate(-50%, -50%)' }}
            >
              <div className="relative w-8 h-8 rounded-full mb-2 bg-brand-maroon-500 shadow-[0_0_15px_rgba(159,18,57,0.6)] border-2 border-brand-cream-100 flex items-center justify-center">
                <div className="absolute inset-0 bg-brand-maroon-400 rounded-full animate-ping opacity-75"></div>
                <div className="w-2 h-2 bg-brand-cream-100 rounded-full"></div>
              </div>
              <span className="text-sm font-bold text-brand-cream-100 bg-brand-maroon-900/95 border border-brand-gold-500/30 px-4 py-2 rounded-full whitespace-nowrap shadow-xl">
                Practice Putting Green
              </span>
            </a>

            {/* 5. Bar */}
            <a
              ref={h5Ref}
              href="/crew"
              className="absolute flex flex-col items-center hover:scale-110 transition-transform duration-300 cursor-pointer group z-10"
              style={{ left: '26%', top: '65%', transform: 'translate(-50%, -50%)' }}
            >
              <div className="relative w-8 h-8 rounded-full mb-2 bg-brand-maroon-500 shadow-[0_0_15px_rgba(159,18,57,0.6)] border-2 border-brand-cream-100 flex items-center justify-center">
                <div className="absolute inset-0 bg-brand-maroon-400 rounded-full animate-ping opacity-75"></div>
                <div className="w-2 h-2 bg-brand-cream-100 rounded-full"></div>
              </div>
              <span className="text-sm font-bold text-brand-cream-100 bg-brand-maroon-900/95 border border-brand-gold-500/30 px-4 py-2 rounded-full whitespace-nowrap shadow-xl">
                The Bar
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Merch */}
      <section ref={merchSectionRef} className="relative py-32 bg-brand-maroon-900/50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <ShoppingBag className="merch-icon w-16 h-16 text-brand-gold-500 mx-auto mb-6" />

            <h2 className="text-3xl md:text-5xl font-serif font-bold text-brand-cream-100 mb-4">
              Old Fart Merch
            </h2>

            <p className="merch-tagline text-lg md:text-xl text-brand-cream-300 mb-12">
              Gear up with official Old Fart apparel, golf equipment, and fishing tackle.
            </p>

            <div className="merch-cards grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-brand-maroon-800/50 border border-brand-cream-400/10 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-brand-gold-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-brand-gold-400">OF</span>
                </div>
                <h3 className="text-xl font-serif font-bold text-brand-cream-100 mb-2">Apparel</h3>
                <p className="text-brand-cream-400 text-sm">Tees, hats, hoodies, and more for the distinguished old fart.</p>
              </div>

              <div className="bg-brand-maroon-800/50 border border-brand-cream-400/10 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-emerald-400">18</span>
                </div>
                <h3 className="text-xl font-serif font-bold text-brand-cream-100 mb-2">Golf Gear</h3>
                <p className="text-brand-cream-400 text-sm">Custom headcovers, towels, and accessories for the course.</p>
              </div>

              <div className="bg-brand-maroon-800/50 border border-brand-cream-400/10 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-sky-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-sky-400">B&T</span>
                </div>
                <h3 className="text-xl font-serif font-bold text-brand-cream-100 mb-2">Fishing Gear</h3>
                <p className="text-brand-cream-400 text-sm">Tackle boxes, lures, and gear for the weekend angler.</p>
              </div>
            </div>

            <div className="merch-cta">
              <Button size="lg" to="/shop">
                Shop All Merch <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      {supabase && (
        <section ref={newsletterRef} className="relative py-32 bg-brand-maroon-950">
          <div className="container mx-auto px-6">
            <div className="max-w-2xl mx-auto text-center">
              <Mail className="mail-icon w-16 h-16 text-brand-gold-500 mx-auto mb-6" />

              <h2 className="text-3xl md:text-5xl font-serif font-bold text-brand-cream-100 mb-4">
                Stay in the Loop
              </h2>

              <p className="text-lg md:text-xl text-brand-cream-300 mb-8">
                Get notified when new episodes drop and be the first to know about merch drops and events.
              </p>

              <form
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row gap-4"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 px-6 py-4 bg-brand-maroon-800 border border-brand-cream-400/20 rounded-lg text-brand-cream-100 placeholder-brand-cream-400 focus:outline-none focus:border-brand-gold-500 transition-colors"
                />
                <Button type="submit" size="lg" disabled={subscribeStatus === 'loading'}>
                  {subscribeStatus === 'loading' ? 'Subscribing...' : 'Subscribe'}
                </Button>
              </form>

              {subscribeStatus === 'success' && (
                <p className="mt-4 text-brand-gold-400">
                  Thanks for subscribing!
                </p>
              )}
              {subscribeStatus === 'error' && (
                <p className="mt-4 text-red-400">
                  Something went wrong. Please try again.
                </p>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
