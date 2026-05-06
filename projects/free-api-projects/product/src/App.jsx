import { useState, useMemo } from 'react';
import { useProducts } from './hooks/useProducts';
import Navbar from './components/Navbar';
import HeroStrip from './components/HeroStrip';
import Controls from './components/Controls';
import ProductGrid from './components/ProductGrid';
import ProductModal from './components/ProductModal';
import Pagination from './components/Pagination';
import './App.css';

export default function App() {
  const { products, loading, error, page, totalPages, totalItems, limit, goToPage, refetch } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [view, setView] = useState('grid');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [category, setCategory] = useState('all');

  const filtered = useMemo(() => {
    let list = [...products];

    // Filter by category
    if (category !== 'all') {
      list = list.filter(p => p.category === category);
    }

    // Filter by search
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'rating-desc':
        list.sort((a, b) => b.rating - a.rating);
        break;
      case 'discount-desc':
        list.sort((a, b) => b.discountPercentage - a.discountPercentage);
        break;
      default:
        break;
    }

    return list;
  }, [products, search, sortBy, category]);

  return (
    <>
      <Navbar totalItems={totalItems} />
      <HeroStrip />

      {error ? (
        <div className="error-state">
          <span className="error-icon">⚠️</span>
          <h3>Failed to load products</h3>
          <p>{error}</p>
          <button className="retry-btn" onClick={refetch}>Try Again</button>
        </div>
      ) : (
        <>
          <Controls
            products={products}
            onSearch={setSearch}
            onSort={setSortBy}
            onFilter={setCategory}
            view={view}
            onViewChange={setView}
          />

          <ProductGrid
            products={filtered}
            loading={loading}
            view={view}
            onProductClick={setSelectedProduct}
          />

          <Pagination
            page={page}
            totalPages={totalPages}
            totalItems={totalItems}
            limit={limit}
            onPageChange={goToPage}
          />
        </>
      )}

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  );
}
