import { Link } from 'react-router-dom';
import './ProductCard.css';

export default function ProductCard({ product }) {
    const totalStock = Object.values(product.sizes).reduce((a, b) => a + b, 0);
    const isOutOfStock = totalStock === 0;

    return (
        <Link to={`/product/${product.id}`} className="product-card glass-card">
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
                <div className="pc-category-tag">{product.category}</div>
            </div>

            <div className="pc-info">
                <span className="pc-type">{product.type}</span>
                <h3 className="pc-name">{product.name}</h3>
                <div className="pc-bottom">
                    <span className="pc-price">₹{product.price.toLocaleString('en-IN')}</span>
                    <span className={`pc-stock ${isOutOfStock ? 'out' : ''}`}>
                        {isOutOfStock ? 'Sold Out' : `${totalStock} in stock`}
                    </span>
                </div>
            </div>
        </Link>
    );
}
