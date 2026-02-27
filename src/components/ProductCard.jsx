import { Link } from 'react-router-dom';
import './ProductCard.css';

export default function ProductCard({ product }) {
    const totalStock = Object.values(product.sizes).reduce((a, b) => a + b, 0);
    const isOutOfStock = totalStock === 0;

    // Graceful fallback: if mrp doesn't exist, don't show strikethrough
    const mrp = product.mrp || null;
    const hasDiscount = mrp && mrp > product.price;
    const discountPercent = hasDiscount ? Math.round(((mrp - product.price) / mrp) * 100) : 0;

    return (
        <div className="product-card glass-card">
            <Link to={`/product/${product.id}`} className="pc-link">
                <div className="pc-image-wrapper">
                    <img
                        src={product.images[0]}
                        alt={product.name}
                        className="pc-image pc-image-1"
                        loading="lazy"
                    />
                    {product.images[1] && (
                        <img
                            src={product.images[1]}
                            alt={`${product.name} alternate`}
                            className="pc-image pc-image-2"
                            loading="lazy"
                        />
                    )}
                    {isOutOfStock && <div className="pc-out-badge">Out of Stock</div>}
                    {hasDiscount && (
                        <div className="pc-discount-badge">{discountPercent}% OFF</div>
                    )}
                    <div className="pc-category-tag">{product.category}</div>
                </div>

                <div className="pc-info">
                    <span className="pc-type">{product.type}</span>
                    <h3 className="pc-name">{product.name}</h3>
                    <div className="pc-bottom">
                        <div className="pc-price-group">
                            <span className="pc-price">₹{product.price.toLocaleString('en-IN')}</span>
                            {hasDiscount && (
                                <span className="pc-mrp">₹{mrp.toLocaleString('en-IN')}</span>
                            )}
                        </div>
                        <span className={`pc-stock ${isOutOfStock ? 'out' : ''}`}>
                            {isOutOfStock ? 'Sold Out' : `${totalStock} in stock`}
                        </span>
                    </div>
                </div>
            </Link>

            {/* Meesho Button */}
            <a
                href="https://www.meesho.com/bossu-footwear"
                target="_blank"
                rel="noopener noreferrer"
                className="pc-meesho-btn"
                onClick={(e) => e.stopPropagation()}
            >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-8 2.75c1.24 0 2.25 1.01 2.25 2.25s-1.01 2.25-2.25 2.25S9.75 10.24 9.75 9s1.01-2.25 2.25-2.25zM17 17H7v-1.5c0-1.67 3.33-2.5 5-2.5s5 .83 5 2.5V17z" />
                </svg>
                Buy on Meesho
            </a>
        </div>
    );
}
