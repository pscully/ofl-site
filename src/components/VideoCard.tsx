import { Play, Eye } from 'lucide-react';
import { Video } from '../types';

interface VideoCardProps {
  video: Video;
  onClick?: () => void;
}

export function VideoCard({ video, onClick }: VideoCardProps) {
  return (
    <div
      className="brand-card rounded-xl overflow-hidden hover:border-brand-gold-400/40 transition-all hover:-translate-y-1 cursor-pointer group"
      onClick={onClick}
    >
      <div className="relative aspect-video bg-brand-maroon-800">
        <img
          src={video.thumbnail_url}
          alt={video.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-brand-maroon-950/40 group-hover:bg-brand-maroon-950/20 transition-colors flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-brand-gold-500/90 group-hover:bg-brand-gold-400 transition-colors flex items-center justify-center" aria-label="Play video">
            <Play className="w-8 h-8 text-brand-maroon-950 ml-1" aria-hidden="true" />
          </div>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-serif font-bold text-brand-cream-100 mb-2 group-hover:text-brand-gold-400 transition-colors line-clamp-2">
          {video.title}
        </h3>

        <p className="text-brand-cream-300 text-sm mb-3 line-clamp-2">
          {video.description}
        </p>

        {video.view_count && (
          <div className="flex items-center gap-2 text-brand-cream-400 text-sm">
            <Eye className="w-4 h-4" />
            <span>{video.view_count.toLocaleString()} views</span>
          </div>
        )}
      </div>
    </div>
  );
}
