import { useState } from 'react';
import './ProductCard.css';

function StarRating({ rating }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <div className="stars" aria-label={`Rating: ${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map(i => (
        <span key={i} className={`star ${i <= full ? 'full' : i === full + 1 && half ? 'half' : 'empty'}`}>★</span>
      ))}
      <span className="rating-num">{rating.toFixed(1)}</span>
    </div>
  );
}

export default function ProductCard({ product, onClick }) {
  const [imgError, setImgError] = useState(false);
  const discountedPrice = (product.price * (1 - product.discountPercentage / 100)).toFixed(2);
  const isLowStock = product.stock < 20;

  return (
    <article className="product-card" onClick={() => onClick(product)} tabIndex={0} onKeyDown={e => e.key === 'Enter' && onClick(product)} role="button" aria-label={`View details for ${product.title}`}>
      <div className="card-image-wrap">
        {imgError ? (
          <div className="card-img-fallback">
            <span>🛍️</span>
          </div>
        ) : (
          <img
            src={product.thumbnail}
            alt={product.title}
            className="card-img"
            loading="lazy"
            onError={() => setImgError(true)}
          />
        )}
        <div className="card-badges">
          {product.discountPercentage >= 10 && (
            <span className="badge badge-deal">-{Math.round(product.discountPercentage)}%</span>
          )}
          {isLowStock && (
            <span className="badge badge-stock">Low Stock</span>
          )}
        </div>
        <div className="card-overlay">
          <span className="overlay-cta">Quick View →</span>
        </div>
      </div>

      <div className="card-body">
        <span className="card-category">{product.category}</span>
        <h3 className="card-title">{product.title}</h3>
        <p className="card-brand">{product.brand}</p>

        <StarRating rating={product.rating} />

        <div className="card-pricing">
          <span className="price-current">${discountedPrice}</span>
          {product.discountPercentage > 0 && (
            <span className="price-original">${product.price}</span>
          )}
        </div>

        <div className="card-footer">
          <span className={`stock-info ${isLowStock ? 'low' : ''}`}>
            {isLowStock ? `⚠ Only ${product.stock} left` : `✓ ${product.stock} in stock`}
          </span>
        </div>
      </div>
    </article>
  );
}
