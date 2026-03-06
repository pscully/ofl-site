import { ShoppingCart } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onClick?: () => void;
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  return (
    <div
      className="brand-card rounded-xl overflow-hidden hover:border-brand-gold-400/40 transition-all hover:-translate-y-1 cursor-pointer group"
      onClick={onClick}
    >
      <div className="relative aspect-square bg-brand-maroon-800">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        {!product.in_stock && (
          <div className="absolute inset-0 bg-brand-maroon-950/80 flex items-center justify-center">
            <span className="text-brand-cream-100 font-bold text-lg">Out of Stock</span>
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-serif font-bold text-brand-cream-100 group-hover:text-brand-gold-400 transition-colors flex-1">
            {product.name}
          </h3>
          <span className="text-brand-gold-500 font-bold text-lg ml-2">
            ${product.price}
          </span>
        </div>

        <p className="text-brand-cream-300 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-brand-cream-400 text-xs uppercase tracking-wide">
            {product.category}
          </span>
          {product.in_stock && (
            <button className="flex items-center gap-2 bg-brand-gold-600 hover:bg-brand-gold-500 text-brand-maroon-950 px-4 py-2 rounded-lg transition-all font-medium text-sm">
              <ShoppingCart className="w-4 h-4" />
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
