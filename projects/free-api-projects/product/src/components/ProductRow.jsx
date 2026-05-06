import { useState } from 'react';
import './ProductRow.css';

function StarRating({ rating }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <div className="row-stars" aria-label={`Rating: ${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map(i => (
        <span key={i} className={`star ${i <= full ? 'full' : i === full + 1 && half ? 'half' : 'empty'}`}>★</span>
      ))}
      <span className="row-rating-num">{rating.toFixed(1)}</span>
    </div>
  );
}

export default function ProductRow({ product, onClick }) {
  const [imgError, setImgError] = useState(false);
  const discountedPrice = (product.price * (1 - product.discountPercentage / 100)).toFixed(2);
  const isLowStock = product.stock < 20;

  return (
    <article className="product-row" onClick={() => onClick(product)} tabIndex={0} onKeyDown={e => e.key === 'Enter' && onClick(product)} role="button" aria-label={`View details for ${product.title}`}>
      <div className="row-image-wrap">
        {imgError ? (
          <div className="row-img-fallback"><span>🛍️</span></div>
        ) : (
          <img src={product.thumbnail} alt={product.title} className="row-img" loading="lazy" onError={() => setImgError(true)} />
        )}
      </div>

      <div className="row-info">
        <span className="row-category">{product.category}</span>
        <h3 className="row-title">{product.title}</h3>
        <p className="row-brand">{product.brand}</p>
        <StarRating rating={product.rating} />
      </div>

      <div className="row-desc">
        <p>{product.description}</p>
      </div>

      <div className="row-meta">
        {product.discountPercentage >= 10 && (
          <span className="row-badge">-{Math.round(product.discountPercentage)}%</span>
        )}
        <div className="row-pricing">
          <span className="row-price">${discountedPrice}</span>
          {product.discountPercentage > 0 && (
            <span className="row-original">${product.price}</span>
          )}
        </div>
        <span className={`row-stock ${isLowStock ? 'low' : ''}`}>
          {isLowStock ? `⚠ ${product.stock} left` : `✓ ${product.stock} in stock`}
        </span>
      </div>
    </article>
  );
}
