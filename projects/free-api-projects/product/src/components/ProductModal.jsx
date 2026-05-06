import { useState, useEffect } from 'react';
import './ProductModal.css';

function StarRating({ rating }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <div className="modal-stars" aria-label={`Rating: ${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map(i => (
        <span key={i} className={`star ${i <= full ? 'full' : i === full + 1 && half ? 'half' : 'empty'}`}>★</span>
      ))}
      <span className="modal-rating-num">{rating.toFixed(1)} / 5</span>
    </div>
  );
}

export default function ProductModal({ product, onClose }) {
  const [activeImg, setActiveImg] = useState(0);
  const [imgErrors, setImgErrors] = useState({});

  useEffect(() => {
    setActiveImg(0);
    setImgErrors({});
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [product]);

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  if (!product) return null;

  const discountedPrice = (product.price * (1 - product.discountPercentage / 100)).toFixed(2);
  const savings = (product.price - discountedPrice).toFixed(2);
  const isLowStock = product.stock < 20;
  const images = product.images?.length ? product.images : [product.thumbnail];

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-label={product.title}>
      <div className="modal-panel" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>

        <div className="modal-body">
          {/* Gallery */}
          <div className="modal-gallery">
            <div className="modal-main-img-wrap">
              {imgErrors[activeImg] ? (
                <div className="modal-img-fallback"><span>🛍️</span></div>
              ) : (
                <img
                  src={images[activeImg]}
                  alt={product.title}
                  className="modal-main-img"
                  onError={() => setImgErrors(prev => ({ ...prev, [activeImg]: true }))}
                />
              )}
              {product.discountPercentage >= 10 && (
                <span className="modal-badge">-{Math.round(product.discountPercentage)}% OFF</span>
              )}
            </div>

            {images.length > 1 && (
              <div className="modal-thumbs" role="list">
                {images.map((img, i) => (
                  <button
                    key={i}
                    role="listitem"
                    className={`modal-thumb ${i === activeImg ? 'active' : ''}`}
                    onClick={() => setActiveImg(i)}
                    aria-label={`View image ${i + 1}`}
                    aria-pressed={i === activeImg}
                  >
                    {imgErrors[i] ? (
                      <span className="thumb-fallback">🛍️</span>
                    ) : (
                      <img src={img} alt="" onError={() => setImgErrors(prev => ({ ...prev, [i]: true }))} />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="modal-info">
            <div className="modal-meta-top">
              <span className="modal-category">{product.category}</span>
              <span className="modal-brand-tag">{product.brand}</span>
            </div>

            <h2 className="modal-title">{product.title}</h2>

            <StarRating rating={product.rating} />

            <p className="modal-description">{product.description}</p>

            <div className="modal-pricing">
              <span className="modal-price">${discountedPrice}</span>
              {product.discountPercentage > 0 && (
                <>
                  <span className="modal-original">${product.price}</span>
                  <span className="modal-savings">You save ${savings}</span>
                </>
              )}
            </div>

            <div className="modal-stats">
              <div className="stat-item">
                <span className="stat-label">Stock</span>
                <span className={`stat-value ${isLowStock ? 'warn' : 'ok'}`}>
                  {isLowStock ? `⚠ ${product.stock} left` : `✓ ${product.stock} units`}
                </span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Discount</span>
                <span className="stat-value accent">{product.discountPercentage}% off</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Rating</span>
                <span className="stat-value">{product.rating} ★</span>
              </div>
            </div>

            <div className="modal-actions">
              <button className="btn-primary">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
                Add to Cart
              </button>
              <button className="btn-secondary">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
                Wishlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
