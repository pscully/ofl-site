export interface Episode {
  id: string;
  title: string;
  description: string;
  date: string;
  duration: string;
  audio_url?: string;
  image_url?: string;
  show_notes?: string;
  guest?: string;
  created_at: string;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  youtube_id: string;
  thumbnail_url: string;
  vertical: 'golfin' | 'fishin';
  view_count?: number;
  published_at: string;
  created_at: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  vertical: 'livin' | 'golfin' | 'fishin';
  shopify_product_id?: string;
  in_stock: boolean;
  created_at: string;
}

export interface Subscriber {
  id: string;
  email: string;
  subscribed_at: string;
}

export type Vertical = 'livin' | 'golfin' | 'fishin';
