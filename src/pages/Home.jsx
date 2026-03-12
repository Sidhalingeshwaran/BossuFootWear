import { Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';
import { ScrollReveal, StaggerReveal } from '../hooks/useScrollReveal';
import './Home.css';

export default function Home() {
    const { products, loading } = useProducts();

    const featured = products.slice(0, 8);

    if (loading) {
        return (
            <div className="home" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
                    <div className="loader-spinner" />
                    <p style={{ marginTop: '1rem', fontSize: '1.1rem' }}>Loading products...</p>
                </div>
            </div>
        );
    }

    const categories = [
        {
            name: 'Men',
            emoji: '👞',
            desc: 'Formal, casual & sporty',
            image: 'https://static.vecteezy.com/system/resources/thumbnails/049/174/246/small/a-smiling-young-indian-man-with-formal-shirts-outdoors-photo.jpg',
        },
        {
            name: 'Women',
            emoji: '👠',
            desc: 'Elegant, trendy & comfortable',
            image: 'https://static.vecteezy.com/system/resources/thumbnails/038/534/919/small/ai-generated-smiley-indian-woman-radiating-joy-in-a-medium-shot-photo.jpg',
        },
        {
            name: 'Kids',
            emoji: '👟',
            desc: 'Fun, durable & playful',
            image: 'https://t4.ftcdn.net/jpg/14/24/51/47/360_F_1424514793_85CPo5TDaV9OnDuAgxcxoloROK0NFWlv.jpg',
        },
    ];

    const features = [
        { icon: '🎯', title: 'Premium Quality', desc: 'Handpicked materials for lasting comfort' },
        { icon: '🚚', title: 'Fast Delivery', desc: 'Quick shipping across India' },
        { icon: '💬', title: 'Easy Ordering', desc: 'Order directly via WhatsApp' },
        { icon: '↩️', title: 'Easy Returns', desc: '7-day hassle-free returns' },
    ];

    const types = [
        { name: 'Sneakers', emoji: '👟' },
        { name: 'Formals', emoji: '👞' },
        { name: 'Baggy Shoes', emoji: '🥾' },
        { name: 'Slippers', emoji: '🩴' },
        { name: 'Sandals', emoji: '👡' },
        { name: 'Sliders', emoji: '🏖️' },
    ];

    return (
        <div className="home">
            {/* ===== HERO ===== */}
            <section className="hero">
                <div className="hero-bg" />
                <div className="hero-particles">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className={`particle particle-${i + 1}`} />
                    ))}
                </div>
                <div className="container hero-content">
                    <div className="hero-text animate-fadeInUp">
                        <span className="hero-badge">✨ New Collection 2026</span>
                        <h1 className="hero-title">
                            Step Into
                            <br />
                            <span className="hero-highlight">Confidence</span>
                        </h1>
                        <p className="hero-subtitle">
                            Premium footwear crafted for the bold. From formals to streetwear —
                            Bossu has you covered.
                        </p>
                        <div className="hero-actions">
                            <Link to="/shop" className="btn btn-primary hero-btn-shop">
                                Shop Now
                                <span className="btn-shine" />
                            </Link>
                            <a
                                href="https://wa.me/919894144712?text=Hi%20Bossu%20Footwear!%20I%20would%20like%20to%20know%20about%20your%20latest%20collection."
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-whatsapp"
                            >
                                💬 WhatsApp Us
                            </a>
                        </div>
                    </div>
                    <div className="hero-visual">
                        <div className="hero-logo-glow" />
                        <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Bossu Footwear" className="hero-logo-img" />
                    </div>
                </div>
                <div className="hero-scroll-indicator">
                    <span>Scroll</span>
                    <div className="scroll-line" />
                </div>
            </section>

            {/* ===== MARQUEE TYPES ===== */}
            <div className="type-marquee">
                <div className="marquee-track">
                    {[...types, ...types, ...types].map((t, i) => (
                        <Link to={`/shop?type=${t.name}`} className="marquee-item" key={i}>
                            <span className="marquee-emoji">{t.emoji}</span>
                            <span className="marquee-name">{t.name}</span>
                        </Link>
                    ))}
                </div>
            </div>

            {/* ===== CATEGORIES ===== */}
            <section className="section categories-section">
                <div className="container">
                    <ScrollReveal animation="blur">
                        <h2 className="section-title">Shop by Category</h2>
                        <p className="section-subtitle">Find the perfect pair for everyone</p>
                    </ScrollReveal>
                    <div className="categories-grid">
                        {categories.map((cat, i) => (
                            <ScrollReveal key={cat.name} animation="fade-up" delay={i * 0.15}>
                                <Link
                                    to={`/shop?category=${cat.name}`}
                                    className="category-card glass-card"
                                >
                                    <div className="cat-image-wrapper">
                                        <img src={cat.image} alt={cat.name} className="cat-image" />
                                        <div className="cat-overlay" />
                                    </div>
                                    <div className="cat-info">
                                        <span className="cat-emoji">{cat.emoji}</span>
                                        <h3 className="cat-name">{cat.name}</h3>
                                        <p className="cat-desc">{cat.desc}</p>
                                        <span className="cat-cta">
                                            Explore →
                                        </span>
                                    </div>
                                </Link>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== FEATURED PRODUCTS ===== */}
            <section className="section featured-section">
                <div className="container">
                    <ScrollReveal animation="blur">
                        <h2 className="section-title">Featured Products</h2>
                        <p className="section-subtitle">Our bestsellers, handpicked for you</p>
                    </ScrollReveal>
                    <StaggerReveal
                        className="products-grid"
                        staggerDelay={0.08}
                        animation="fade-up"
                    >
                        {featured.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </StaggerReveal>
                    <ScrollReveal animation="fade-up" delay={0.3}>
                        <div className="featured-cta">
                            <Link to="/shop" className="btn btn-secondary">
                                View All Products →
                            </Link>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* ===== WHY CHOOSE US ===== */}
            <section className="section features-section">
                <div className="container">
                    <ScrollReveal animation="blur">
                        <h2 className="section-title">Why Choose Bossu?</h2>
                        <p className="section-subtitle">Your satisfaction is our top priority</p>
                    </ScrollReveal>
                    <div className="features-grid">
                        {features.map((f, i) => (
                            <ScrollReveal key={i} animation="scale" delay={i * 0.12}>
                                <div className="feature-card glass-card">
                                    <span className="feature-icon">{f.icon}</span>
                                    <h3 className="feature-title">{f.title}</h3>
                                    <p className="feature-desc">{f.desc}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== CTA BANNER ===== */}
            <section className="cta-banner">
                <div className="container cta-content">
                    <ScrollReveal animation="scale">
                        <h2 className="cta-title">Ready to Upgrade Your Style?</h2>
                        <p className="cta-desc">
                            Browse our collection and order directly via WhatsApp. No hassle, no complicated checkout.
                        </p>
                        <div className="cta-actions">
                            <Link to="/shop" className="btn btn-primary">
                                Browse Collection
                            </Link>
                            <a
                                href="https://wa.me/919894144712"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-whatsapp"
                            >
                                💬 Chat with Us
                            </a>
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </div>
    );
}
