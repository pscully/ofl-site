import { Link } from 'react-router-dom';
import { Mic2, Youtube, Mail, Podcast, Video, Wifi } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-br from-brand-maroon-950 via-brand-maroon-900 to-brand-maroon-950 overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-64 h-64 bg-brand-gold-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-brand-gold-500 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 py-16 relative">
        <div className="grid lg:grid-cols-5 md:grid-cols-3 gap-12 mb-16">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-br from-brand-gold-500 to-brand-gold-600 p-3 rounded-2xl shadow-lg">
                <Mic2 className="w-8 h-8 text-brand-maroon-950" />
              </div>
              <span className="text-3xl font-serif font-bold text-brand-cream-100">
                Old Fart
              </span>
            </div>
            <p className="text-brand-cream-300 text-lg leading-relaxed mb-6 max-w-md">
              Just some old dudes talking about life, golf, fishing, and everything in between. Real conversations, real laughs, real life.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="group bg-brand-maroon-800/50 hover:bg-brand-gold-500 p-3 rounded-xl transition-all duration-300 border border-brand-cream-400/20 hover:border-brand-gold-400"
              >
                <Youtube className="w-6 h-6 text-brand-cream-300 group-hover:text-brand-maroon-950 transition-colors" />
              </a>
              <a
                href="#"
                className="group bg-brand-maroon-800/50 hover:bg-brand-gold-500 p-3 rounded-xl transition-all duration-300 border border-brand-cream-400/20 hover:border-brand-gold-400"
              >
                <Mail className="w-6 h-6 text-brand-cream-300 group-hover:text-brand-maroon-950 transition-colors" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-serif font-bold text-brand-cream-100 text-xl mb-6 flex items-center gap-2">
              <Podcast className="w-5 h-5 text-brand-gold-500" />
              Our Shows
            </h3>
            <div className="flex flex-col gap-3">
              <Link
                to="/livin"
                className="group flex items-center gap-2 text-brand-cream-300 hover:text-brand-gold-400 transition-all duration-300"
              >
                <div className="w-1 h-1 bg-brand-gold-500 rounded-full group-hover:w-2 group-hover:h-2 transition-all duration-300"></div>
                Old Fart Livin'
              </Link>
              <Link
                to="/golfin"
                className="group flex items-center gap-2 text-brand-cream-300 hover:text-brand-gold-400 transition-all duration-300"
              >
                <div className="w-1 h-1 bg-brand-gold-500 rounded-full group-hover:w-2 group-hover:h-2 transition-all duration-300"></div>
                Old Fart Golfin'
              </Link>
              <Link
                to="/fishin"
                className="group flex items-center gap-2 text-brand-cream-300 hover:text-brand-gold-400 transition-all duration-300"
              >
                <div className="w-1 h-1 bg-brand-gold-500 rounded-full group-hover:w-2 group-hover:h-2 transition-all duration-300"></div>
                Old Fart Fishin'
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-serif font-bold text-brand-cream-100 text-xl mb-6">About</h3>
            <div className="flex flex-col gap-3">
              <Link
                to="/crew"
                className="group flex items-center gap-2 text-brand-cream-300 hover:text-brand-gold-400 transition-all duration-300"
              >
                <div className="w-1 h-1 bg-brand-gold-500 rounded-full group-hover:w-2 group-hover:h-2 transition-all duration-300"></div>
                Meet the Crew
              </Link>
              <Link
                to="/contact"
                className="group flex items-center gap-2 text-brand-cream-300 hover:text-brand-gold-400 transition-all duration-300"
              >
                <div className="w-1 h-1 bg-brand-gold-500 rounded-full group-hover:w-2 group-hover:h-2 transition-all duration-300"></div>
                Contact Us
              </Link>
              <Link
                to="/shop"
                className="group flex items-center gap-2 text-brand-cream-300 hover:text-brand-gold-400 transition-all duration-300"
              >
                <div className="w-1 h-1 bg-brand-gold-500 rounded-full group-hover:w-2 group-hover:h-2 transition-all duration-300"></div>
                Shop Merch
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-serif font-bold text-brand-cream-100 text-xl mb-6">Explore</h3>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 text-brand-cream-300">
                <Podcast className="w-5 h-5 text-brand-gold-500" />
                <span className="text-sm">Our Conversations</span>
              </div>
              <div className="flex items-center gap-3 text-brand-cream-300">
                <Video className="w-5 h-5 text-brand-gold-500" />
                <span className="text-sm">Video Content</span>
              </div>
              <div className="flex items-center gap-3 text-brand-cream-300">
                <Wifi className="w-5 h-5 text-brand-gold-500" />
                <span className="text-sm">Leaderboard</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-brand-cream-400/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-brand-cream-400 text-sm">
              © {currentYear} Old Fart Media. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-brand-cream-400 hover:text-brand-gold-400 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-brand-cream-400 hover:text-brand-gold-400 transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
