import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';
import './ProductDetail.css';

export default function ProductDetail() {
    const { id } = useParams();
    const { getProduct, getFilteredProducts, loading } = useProducts();
    const product = getProduct(id);

    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedSize, setSelectedSize] = useState(null);

    if (loading) {
        return (
            <div className="detail-page" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
                    <div className="loader-spinner" />
                    <p style={{ marginTop: '1rem' }}>Loading product...</p>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="detail-page">
                <div className="container detail-not-found">
                    <span>😔</span>
                    <h2>Product Not Found</h2>
                    <p>The product you're looking for doesn't exist or has been removed.</p>
                    <Link to="/shop" className="btn btn-primary">
                        Back to Shop
                    </Link>
                </div>
            </div>
        );
    }

    const totalStock = Object.values(product.sizes).reduce((a, b) => a + b, 0);
    const isOutOfStock = totalStock === 0;

    // WhatsApp message
    const buildWhatsAppLink = () => {
        const sizeText = selectedSize ? `Size: ${selectedSize}` : 'Size: Not selected';
        const message = `Hi Bossu Footwear! 🛒\n\nI would like to order:\n\n📦 Product: ${product.name}\n👟 Type: ${product.type}\n📏 ${sizeText}\n💰 Price: ₹${product.price.toLocaleString('en-IN')}\n\nPlease confirm availability and shipping details. Thank you!`;
        return `https://wa.me/919894144712?text=${encodeURIComponent(message)}`;
    };

    // Related products (same category, different id)
    const related = getFilteredProducts({ category: product.category })
        .filter((p) => p.id !== product.id)
        .slice(0, 4);

    return (
        <div className="detail-page">
            <div className="container">
                {/* Breadcrumb */}
                <nav className="breadcrumb">
                    <Link to="/">Home</Link>
                    <span>/</span>
                    <Link to="/shop">Shop</Link>
                    <span>/</span>
                    <Link to={`/shop?category=${product.category}`}>{product.category}</Link>
                    <span>/</span>
                    <span className="current">{product.name}</span>
                </nav>

                {/* Product Main */}
                <div className="detail-main">
                    {/* Images */}
                    <div className="detail-images">
                        <div className="detail-main-image">
                            <img
                                src={product.images[selectedImage]}
                                alt={product.name}
                                className="main-img"
                            />
                            {isOutOfStock && <div className="detail-out-badge">Out of Stock</div>}
                        </div>
                        <div className="detail-thumbnails">
                            {product.images.map((img, i) => (
                                <button
                                    key={i}
                                    className={`thumb-btn ${selectedImage === i ? 'active' : ''}`}
                                    onClick={() => setSelectedImage(i)}
                                >
                                    <img src={img} alt={`${product.name} view ${i + 1}`} className="thumb-img" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Info */}
                    <div className="detail-info">
                        <div className="detail-meta">
                            <span className="detail-type">{product.type}</span>
                            <span className="detail-category">{product.category}</span>
                        </div>

                        <h1 className="detail-name">{product.name}</h1>

                        <div className="detail-price">
                            ₹{product.price.toLocaleString('en-IN')}
                        </div>

                        <p className="detail-desc">{product.description}</p>

                        {/* Sizes */}
                        <div className="detail-sizes">
                            <h3 className="sizes-label">Select Size</h3>
                            <div className="sizes-grid">
                                {Object.entries(product.sizes).map(([size, stock]) => (
                                    <button
                                        key={size}
                                        className={`size-btn ${selectedSize === size ? 'selected' : ''} ${stock === 0 ? 'disabled' : ''}`}
                                        onClick={() => stock > 0 && setSelectedSize(size)}
                                        disabled={stock === 0}
                                    >
                                        <span className="size-num">{size}</span>
                                        <span className={`size-stock ${stock === 0 ? 'out' : stock <= 3 ? 'low' : ''}`}>
                                            {stock === 0 ? 'Out' : `${stock} left`}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="detail-actions">
                            <a
                                href={buildWhatsAppLink()}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`btn btn-whatsapp detail-wa-btn ${!selectedSize ? 'btn-disabled' : ''}`}
                                onClick={(e) => {
                                    if (!selectedSize) {
                                        e.preventDefault();
                                        alert('Please select a size first!');
                                    }
                                }}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                </svg>
                                Order via WhatsApp
                            </a>
                        </div>

                        {!selectedSize && (
                            <p className="size-hint">👆 Please select a size to place an order</p>
                        )}

                        {/* Shipping Info */}
                        <div className="detail-shipping">
                            <div className="shipping-item">🚚 Free shipping above ₹2000</div>
                            <div className="shipping-item">↩️ 7-day easy returns</div>
                            <div className="shipping-item">✅ 100% genuine product</div>
                        </div>
                    </div>
                </div>

                {/* Related Products */}
                {related.length > 0 && (
                    <section className="section related-section">
                        <h2 className="section-title">You May Also Like</h2>
                        <div className="products-grid related-grid">
                            {related.map((p) => (
                                <ProductCard key={p.id} product={p} />
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}
