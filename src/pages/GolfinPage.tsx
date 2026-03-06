import { useEffect, useState } from 'react';
import { Wifi, Youtube } from 'lucide-react';
import golfImage from '../assets/golf.jpg';
import { VideoCard } from '../components/VideoCard';
import { Button } from '../components/Button';
import { supabase } from '../lib/supabase';
import { Video } from '../types';

export function GolfinPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('videos')
        .select('*')
        .eq('vertical', 'golfin')
        .order('published_at', { ascending: false });

      if (error) throw error;
      setVideos(data || []);
    } catch (err) {
      console.error('Error fetching videos:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <section className="relative py-44 md:py-52 overflow-hidden">
        <img
          src={golfImage}
          alt="Old Fart crew on the golf course"
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-brand-maroon-950/75"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-brand-gold-600/10 via-transparent to-transparent"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Wifi className="w-20 h-20 text-brand-gold-500 mx-auto mb-6" />

            <h1 className="text-5xl md:text-7xl font-serif font-bold text-brand-cream-100 mb-6 text-shadow-glow">
              Old Fart Golfin'
            </h1>

            <p className="text-xl md:text-2xl text-brand-cream-200 mb-12 leading-relaxed">
              Golf tips, course reviews, equipment talk, and the stories from the 19th hole you won't hear anywhere else.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="#" size="lg">
                <Youtube className="w-5 h-5 mr-2" />
                Subscribe on YouTube
              </Button>
              <Button to="/shop?vertical=golfin" size="lg" variant="outline">
                Shop Golf Merch
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-brand-maroon-900/50">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-cream-100">
              Latest Videos
            </h2>
          </div>

          {loading ? (
            <div className="text-center text-brand-cream-300 py-20">
              Loading videos...
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-red-400 mb-4">Failed to load videos.</p>
              <button onClick={fetchVideos} className="text-brand-gold-400 hover:text-brand-gold-300 underline">
                Try again
              </button>
            </div>
          ) : videos.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-brand-cream-300 mb-6">
                No videos yet. Check back soon!
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto brand-card rounded-2xl p-12 text-center">
            <h2 className="text-3xl font-serif font-bold text-brand-cream-100 mb-4">
              About Old Fart Golfin'
            </h2>
            <p className="text-brand-cream-300 leading-relaxed">
              Whether you're a scratch golfer or just trying to break 100, Old Fart Golfin' is your go-to source
              for honest golf content. We cover everything from course vlogs and equipment reviews to swing tips
              and tournament recaps. No pretension, no gatekeeping—just real golfers sharing what we love about
              the game. Join us on the course and see why golf in your 40s is better than ever.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
