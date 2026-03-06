import { useEffect, useState } from 'react';
import { Fish, Youtube } from 'lucide-react';
import { VideoCard } from '../components/VideoCard';
import { Button } from '../components/Button';
import { supabase } from '../lib/supabase';
import { Video } from '../types';
import fishinImage from '../assets/fishin.webp';

export function FishinPage() {
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
        .eq('vertical', 'fishin')
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
      <section className="relative py-32 md:py-52 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${fishinImage})` }}
        ></div>
        <div className="absolute inset-0 bg-brand-maroon-950/80"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-brand-gold-600/10 via-transparent to-transparent"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Fish className="w-20 h-20 text-brand-gold-500 mx-auto mb-6" />

            <h1 className="text-5xl md:text-7xl font-serif font-bold text-brand-cream-100 mb-6 text-shadow-glow">
              Old Fart Fishin'
            </h1>

            <p className="text-xl md:text-2xl text-brand-cream-200 mb-12 leading-relaxed">
              Fishing adventures, tackle reviews, and the tall tales that make every fishing trip legendary.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="#" size="lg">
                <Youtube className="w-5 h-5 mr-2" />
                Subscribe on YouTube
              </Button>
              <Button to="/shop?vertical=fishin" size="lg" variant="outline">
                Shop Fishing Merch
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
              About Old Fart Fishin'
            </h2>
            <p className="text-brand-cream-300 leading-relaxed">
              From bass boats to trout streams, Old Fart Fishin' takes you on authentic fishing adventures.
              We test tackle, share techniques, visit legendary fishing spots, and tell the stories that
              only come from hours on the water. Whether you're a tournament angler or a weekend warrior,
              we're here to celebrate the sport, the camaraderie, and the occasional whopper that didn't get away.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
