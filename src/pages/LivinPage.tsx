import { useEffect, useState } from 'react';
import { Mic2, Music2 } from 'lucide-react';
import hostsImage from '../assets/hosts.jpg';
import { EpisodeCard } from '../components/EpisodeCard';
import { Button } from '../components/Button';
import { supabase } from '../lib/supabase';
import { Episode } from '../types';

export function LivinPage() {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchEpisodes();
  }, []);

  const fetchEpisodes = async () => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('episodes')
        .select('*')
        .order('date', { ascending: false });

      if (error) throw error;
      setEpisodes(data || []);
    } catch (err) {
      console.error('Error fetching episodes:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <section className="relative py-44 md:py-52 overflow-hidden">
        <img
          src={hostsImage}
          alt="Old Fart Podcast hosts"
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-brand-maroon-950/75"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-brand-gold-600/10 via-transparent to-transparent"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Mic2 className="w-20 h-20 text-brand-gold-500 mx-auto mb-6" />

            <h1 className="text-5xl md:text-7xl font-serif font-bold text-brand-cream-100 mb-6 text-shadow-glow">
              Old Fart Livin'
            </h1>

            <p className="text-xl md:text-2xl text-brand-cream-200 mb-12 leading-relaxed">
              Sports talk, fantasy football, real life stories, and the conversations that matter.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button href="#" size="lg">
                <Music2 className="w-5 h-5 mr-2" />
                Apple Podcasts
              </Button>
              <Button href="#" size="lg" variant="secondary">
                <Music2 className="w-5 h-5 mr-2" />
                Spotify
              </Button>
              <Button href="#" size="lg" variant="secondary">
                <Music2 className="w-5 h-5 mr-2" />
                YouTube
              </Button>
            </div>

            <p className="text-brand-cream-400 text-sm">
              New conversations every Tuesday
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-brand-maroon-900/50">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-cream-100">
              Latest Conversations
            </h2>
          </div>

          {loading ? (
            <div className="text-center text-brand-cream-300 py-20">
              Loading conversations...
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-red-400 mb-4">Failed to load conversations.</p>
              <button onClick={fetchEpisodes} className="text-brand-gold-400 hover:text-brand-gold-300 underline">
                Try again
              </button>
            </div>
          ) : episodes.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-brand-cream-300 mb-6">
                No conversations yet. Check back soon!
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {episodes.map((episode) => (
                <EpisodeCard key={episode.id} episode={episode} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto brand-card rounded-2xl p-12 text-center">
            <h2 className="text-3xl font-serif font-bold text-brand-cream-100 mb-4">
              About the Show
            </h2>
            <p className="text-brand-cream-300 leading-relaxed">
              Old Fart Livin' is where three longtime friends dive deep into the topics that matter most.
              From NFL and fantasy football debates to navigating work, family, and keeping your sanity in your 40s,
              we bring authentic conversations with humor, insight, and zero filter. Whether you're grinding through
              your week or relaxing on the weekend, we're here to keep you entertained and maybe even make you think.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
