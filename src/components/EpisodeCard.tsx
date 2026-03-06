import { Play, Calendar, Clock } from 'lucide-react';
import { Episode } from '../types';

interface EpisodeCardProps {
  episode: Episode;
  onClick?: () => void;
}

export function EpisodeCard({ episode, onClick }: EpisodeCardProps) {
  return (
    <div
      className="brand-card rounded-xl p-6 hover:border-brand-gold-400/40 transition-all hover:-translate-y-1 cursor-pointer group"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2 text-brand-cream-400 text-sm">
          <Calendar className="w-4 h-4" />
          <span>{new Date(episode.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
        </div>
        <div className="flex items-center gap-2 text-brand-cream-400 text-sm">
          <Clock className="w-4 h-4" />
          <span>{episode.duration}</span>
        </div>
      </div>

      <h3 className="text-xl font-serif font-bold text-brand-cream-100 mb-3 group-hover:text-brand-gold-400 transition-colors">
        {episode.title}
      </h3>

      <p className="text-brand-cream-300 mb-4 line-clamp-2">
        {episode.description}
      </p>

      {episode.guest && (
        <p className="text-brand-gold-500 text-sm mb-4">
          Guest: {episode.guest}
        </p>
      )}

      <button className="flex items-center gap-2 text-brand-gold-500 hover:text-brand-gold-400 transition-colors font-medium">
        <Play className="w-5 h-5" />
        Listen Now
      </button>
    </div>
  );
}
