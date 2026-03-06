import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import gameImage from '../assets/game.jpg';
import { ProductCard } from '../components/ProductCard';
import { supabase } from '../lib/supabase';
import { Product } from '../types';

export function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [filter, setFilter] = useState<string>(searchParams.get('vertical') || 'all');

  useEffect(() => {
    fetchProducts();
  }, [filter]);

  const fetchProducts = async () => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    try {
      let query = supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (filter !== 'all') {
        query = query.eq('vertical', filter);
      }

      const { data, error } = await query;

      if (error) throw error;
      setProducts(data || []);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    if (newFilter === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ vertical: newFilter });
    }
  };

  return (
    <div>
      <section className="relative py-32 md:py-52 overflow-hidden">
        <img
          src={gameImage}
          alt="Old Fart game day"
          className="absolute inset-0 w-full h-full object-cover object-[center_30%]"
        />
        <div className="absolute inset-0 bg-brand-maroon-950/75"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-gold-600/10 via-transparent to-transparent"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <ShoppingBag className="w-20 h-20 text-brand-gold-500 mx-auto mb-6" />

            <h1 className="text-5xl md:text-7xl font-serif font-bold text-brand-cream-100 mb-6 text-shadow-glow">
              Old Fart Merch
            </h1>

            <p className="text-xl md:text-2xl text-brand-cream-200 leading-relaxed">
              Show your Old Fart pride with quality gear for the course, the lake, and everyday life.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-brand-maroon-900/50">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <button
              onClick={() => handleFilterChange('all')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${filter === 'all'
                  ? 'bg-brand-gold-600 text-brand-maroon-950'
                  : 'bg-brand-maroon-800 text-brand-cream-200 hover:bg-brand-maroon-700'
                }`}
            >
              All Products
            </button>
            <button
              onClick={() => handleFilterChange('livin')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${filter === 'livin'
                  ? 'bg-brand-gold-600 text-brand-maroon-950'
                  : 'bg-brand-maroon-800 text-brand-cream-200 hover:bg-brand-maroon-700'
                }`}
            >
              Livin'
            </button>
            <button
              onClick={() => handleFilterChange('golfin')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${filter === 'golfin'
                  ? 'bg-brand-gold-600 text-brand-maroon-950'
                  : 'bg-brand-maroon-800 text-brand-cream-200 hover:bg-brand-maroon-700'
                }`}
            >
              Golfin'
            </button>
            <button
              onClick={() => handleFilterChange('fishin')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${filter === 'fishin'
                  ? 'bg-brand-gold-600 text-brand-maroon-950'
                  : 'bg-brand-maroon-800 text-brand-cream-200 hover:bg-brand-maroon-700'
                }`}
            >
              Fishin'
            </button>
          </div>

          {loading ? (
            <div className="text-center text-brand-cream-300 py-20">
              Loading products...
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-red-400 mb-4">Failed to load products.</p>
              <button onClick={fetchProducts} className="text-brand-gold-400 hover:text-brand-gold-300 underline">
                Try again
              </button>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-brand-cream-300 mb-6">
                No products available yet. Check back soon!
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
