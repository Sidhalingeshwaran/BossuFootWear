import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [catOpen, setCatOpen] = useState(false);
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    const closeMobile = () => {
        setMobileOpen(false);
        setCatOpen(false);
    };

    return (
        <header className="navbar">
            <div className="container navbar-inner">
                {/* Logo */}
                <Link to="/" className="navbar-logo" onClick={closeMobile}>
                    <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Bossu Footwear" className="navbar-logo-img" />
                    <div className="navbar-logo-text">
                        <span className="navbar-brand">BOSSU</span>
                        <span className="navbar-sub">FootWear</span>
                    </div>
                </Link>

                {/* Desktop Nav */}
                <nav className="navbar-links">
                    <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
                        Home
                    </Link>

                    <div
                        className="nav-dropdown"
                        onMouseEnter={() => setCatOpen(true)}
                        onMouseLeave={() => setCatOpen(false)}
                    >
                        <Link
                            to="/shop"
                            className={`nav-link ${location.pathname.startsWith('/shop') ? 'active' : ''}`}
                        >
                            Shop <span className="nav-arrow">▾</span>
                        </Link>
                        {catOpen && (
                            <div className="dropdown-menu">
                                <Link to="/shop?category=Men" className="dropdown-item" onClick={() => setCatOpen(false)}>
                                    👞 Men
                                </Link>
                                <Link to="/shop?category=Women" className="dropdown-item" onClick={() => setCatOpen(false)}>
                                    👠 Women
                                </Link>
                                <Link to="/shop?category=Kids" className="dropdown-item" onClick={() => setCatOpen(false)}>
                                    👟 Kids
                                </Link>
                                <div className="dropdown-divider" />
                                <Link to="/shop" className="dropdown-item" onClick={() => setCatOpen(false)}>
                                    🛍️ All Products
                                </Link>
                            </div>
                        )}
                    </div>

                    <Link to="/admin" className={`nav-link ${isActive('/admin') ? 'active' : ''}`}>
                        Admin
                    </Link>
                </nav>

                {/* WhatsApp CTA */}
                <a
                    href="https://wa.me/919894144712"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="navbar-wa-btn"
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                    Order Now
                </a>

                {/* Mobile Toggle */}
                <button
                    className={`navbar-hamburger ${mobileOpen ? 'open' : ''}`}
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label="Toggle menu"
                >
                    <span /><span /><span />
                </button>
            </div>

            {/* Mobile Menu */}
            <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`}>
                <Link to="/" className="mobile-link" onClick={closeMobile}>Home</Link>
                <Link to="/shop" className="mobile-link" onClick={closeMobile}>All Products</Link>
                <Link to="/shop?category=Men" className="mobile-link" onClick={closeMobile}>👞 Men</Link>
                <Link to="/shop?category=Women" className="mobile-link" onClick={closeMobile}>👠 Women</Link>
                <Link to="/shop?category=Kids" className="mobile-link" onClick={closeMobile}>👟 Kids</Link>
                <Link to="/admin" className="mobile-link" onClick={closeMobile}>Admin</Link>
                <a
                    href="https://wa.me/919894144712"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mobile-link wa-link"
                    onClick={closeMobile}
                >
                    💬 Order via WhatsApp
                </a>
            </div>
        </header>
    );
}
