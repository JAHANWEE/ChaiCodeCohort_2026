import ProductCard from './ProductCard';
import ProductRow from './ProductRow';
import SkeletonCard from './SkeletonCard';
import './ProductGrid.css';

export default function ProductGrid({ products, loading, view, onProductClick }) {
  if (loading) {
    return (
      <div className={`product-grid ${view === 'list' ? 'list-view' : 'grid-view'}`}>
        {Array.from({ length: 10 }).map((_, i) => (
          <SkeletonCard key={i} view={view} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="empty-state">
        <span className="empty-icon">🔍</span>
        <h3>No products found</h3>
        <p>Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div className={`product-grid ${view === 'list' ? 'list-view' : 'grid-view'}`}>
      {products.map(product =>
        view === 'list'
          ? <ProductRow key={product.id} product={product} onClick={onProductClick} />
          : <ProductCard key={product.id} product={product} onClick={onProductClick} />
      )}
    </div>
  );
}
