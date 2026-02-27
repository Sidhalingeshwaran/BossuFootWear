import { useState } from 'react';
import { useProducts } from '../context/ProductContext';
import './Admin.css';

const ADMIN_PASSWORD = 'bossu2024';

export default function Admin() {
    const {
        products,
        loading,
        addProduct,
        deleteProduct,
        updateStock,
        resetProducts,
    } = useProducts();

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');

    const [activeTab, setActiveTab] = useState('products'); // products | add
    const [successMsg, setSuccessMsg] = useState('');

    // Add Product Form
    const [form, setForm] = useState({
        name: '',
        type: 'Sneakers',
        category: 'Men',
        mrp: '',
        price: '',
        description: '',
        image1: '',
        image2: '',
        size5: '0',
        size6: '10',
        size7: '10',
        size8: '10',
        size9: '10',
        size10: '10',
    });

    const types = ['Shoes', 'Baggy Shoes', 'Formals', 'Sneakers', 'Slippers', 'Sandals', 'Sliders'];
    const categories = ['Men', 'Women', 'Kids'];

    const handleLogin = (e) => {
        e.preventDefault();
        if (password === ADMIN_PASSWORD) {
            setIsAuthenticated(true);
            setLoginError('');
        } else {
            setLoginError('Incorrect password. Please try again.');
        }
    };

    const showSuccess = (msg) => {
        setSuccessMsg(msg);
        setTimeout(() => setSuccessMsg(''), 3000);
    };

    const handleAddProduct = (e) => {
        e.preventDefault();
        if (!form.name || !form.price || !form.image1) {
            alert('Please fill in at least name, price, and image 1.');
            return;
        }

        const product = {
            name: form.name,
            type: form.type,
            category: form.category,
            mrp: Number(form.mrp) || (Number(form.price) + [899, 999, 1299][Math.floor(Math.random() * 3)]),
            price: Number(form.price),
            description: form.description,
            images: [form.image1, form.image2 || form.image1],
            sizes: {
                5: Number(form.size5) || 0,
                6: Number(form.size6) || 0,
                7: Number(form.size7) || 0,
                8: Number(form.size8) || 0,
                9: Number(form.size9) || 0,
                10: Number(form.size10) || 0,
            },
        };

        addProduct(product);
        showSuccess(`"${form.name}" added successfully!`);

        // Reset form
        setForm({
            name: '',
            type: 'Sneakers',
            category: 'Men',
            mrp: '',
            price: '',
            description: '',
            image1: '',
            image2: '',
            size5: '0',
            size6: '10',
            size7: '10',
            size8: '10',
            size9: '10',
            size10: '10',
        });
    };

    const handleStockChange = (productId, size, value) => {
        const num = Math.max(0, Number(value) || 0);
        updateStock(productId, size, num);
    };

    const handleDelete = (product) => {
        if (window.confirm(`Delete "${product.name}"? This cannot be undone.`)) {
            deleteProduct(product.id);
            showSuccess(`"${product.name}" deleted.`);
        }
    };

    const handleReset = () => {
        if (window.confirm('Reset all products to defaults? This will remove any products you added.')) {
            resetProducts();
            showSuccess('Products reset to defaults.');
        }
    };

    // Login Page
    if (!isAuthenticated) {
        return (
            <div className="admin-page">
                <div className="container">
                    <div className="admin-login-wrapper">
                        <div className="admin-login glass-card">
                            <div className="login-icon">🔐</div>
                            <h1 className="login-title">Admin Access</h1>
                            <p className="login-subtitle">Enter your password to manage products</p>
                            <form onSubmit={handleLogin} className="login-form">
                                <div className="form-group">
                                    <input
                                        type="password"
                                        className="form-input"
                                        placeholder="Enter admin password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        autoFocus
                                    />
                                </div>
                                {loginError && <p className="login-error">{loginError}</p>}
                                <button type="submit" className="btn btn-primary login-btn">
                                    Login
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="admin-page">
            <div className="container">
                {/* Header */}
                <div className="admin-header">
                    <div>
                        <h1 className="admin-title">Admin Dashboard</h1>
                        <p className="admin-subtitle">Manage your products and inventory</p>
                    </div>
                    <div className="admin-header-actions">
                        <button className="btn btn-secondary btn-sm" onClick={handleReset}>
                            ↩️ Reset Products
                        </button>
                        <button className="btn btn-danger btn-sm" onClick={() => setIsAuthenticated(false)}>
                            🔒 Logout
                        </button>
                    </div>
                </div>

                {/* Success Toast */}
                {successMsg && (
                    <div className="admin-toast animate-fadeInUp">
                        ✅ {successMsg}
                    </div>
                )}

                {/* Tabs */}
                <div className="admin-tabs">
                    <button
                        className={`admin-tab ${activeTab === 'products' ? 'active' : ''}`}
                        onClick={() => setActiveTab('products')}
                    >
                        📦 Product List ({products.length})
                    </button>
                    <button
                        className={`admin-tab ${activeTab === 'add' ? 'active' : ''}`}
                        onClick={() => setActiveTab('add')}
                    >
                        ➕ Add Product
                    </button>
                </div>

                {/* === PRODUCTS TAB === */}
                {activeTab === 'products' && (
                    <div className="admin-products">
                        {products.length === 0 ? (
                            <div className="admin-empty">
                                <p>No products found. Add your first product!</p>
                                <button className="btn btn-primary btn-sm" onClick={() => setActiveTab('add')}>
                                    Add Product
                                </button>
                            </div>
                        ) : (
                            <div className="admin-table-wrapper">
                                <table className="admin-table">
                                    <thead>
                                        <tr>
                                            <th>Product</th>
                                            <th>Type</th>
                                            <th>Category</th>
                                            <th>MRP</th>
                                            <th>Price</th>
                                            <th>Size 5</th>
                                            <th>Size 6</th>
                                            <th>Size 7</th>
                                            <th>Size 8</th>
                                            <th>Size 9</th>
                                            <th>Size 10</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products.map((product) => (
                                            <tr key={product.id}>
                                                <td>
                                                    <div className="admin-product-cell">
                                                        <img
                                                            src={product.images[0]}
                                                            alt={product.name}
                                                            className="admin-product-thumb"
                                                        />
                                                        <span className="admin-product-name">{product.name}</span>
                                                    </div>
                                                </td>
                                                <td><span className="admin-badge">{product.type}</span></td>
                                                <td>{product.category}</td>
                                                <td className="admin-mrp">
                                                    {product.mrp ? `₹${product.mrp.toLocaleString('en-IN')}` : '—'}
                                                </td>
                                                <td className="admin-price">₹{product.price.toLocaleString('en-IN')}</td>
                                                {[5, 6, 7, 8, 9, 10].map((size) => (
                                                    <td key={size}>
                                                        <input
                                                            type="number"
                                                            className="stock-input"
                                                            min="0"
                                                            value={product.sizes[size] ?? 0}
                                                            onChange={(e) => handleStockChange(product.id, size, e.target.value)}
                                                        />
                                                    </td>
                                                ))}
                                                <td>
                                                    <button
                                                        className="btn btn-danger btn-sm"
                                                        onClick={() => handleDelete(product)}
                                                    >
                                                        🗑️
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}

                {/* === ADD PRODUCT TAB === */}
                {activeTab === 'add' && (
                    <div className="admin-add glass-card">
                        <h2 className="add-title">Add New Product</h2>
                        <form onSubmit={handleAddProduct} className="add-form">
                            <div className="add-form-grid">
                                <div className="form-group">
                                    <label>Product Name *</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        placeholder="e.g. Royal Oxford Classic"
                                        value={form.name}
                                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>MRP (₹)</label>
                                    <input
                                        type="number"
                                        className="form-input"
                                        placeholder="e.g. 4999"
                                        value={form.mrp}
                                        onChange={(e) => setForm({ ...form, mrp: e.target.value })}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Offer Price (₹) *</label>
                                    <input
                                        type="number"
                                        className="form-input"
                                        placeholder="e.g. 3499"
                                        value={form.price}
                                        onChange={(e) => setForm({ ...form, price: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Type</label>
                                    <select
                                        className="form-input"
                                        value={form.type}
                                        onChange={(e) => setForm({ ...form, type: e.target.value })}
                                    >
                                        {types.map((t) => (
                                            <option key={t} value={t}>{t}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Category</label>
                                    <select
                                        className="form-input"
                                        value={form.category}
                                        onChange={(e) => setForm({ ...form, category: e.target.value })}
                                    >
                                        {categories.map((c) => (
                                            <option key={c} value={c}>{c}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-group form-full">
                                    <label>Description</label>
                                    <textarea
                                        className="form-input"
                                        rows="3"
                                        placeholder="Product description..."
                                        value={form.description}
                                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Image URL 1 *</label>
                                    <input
                                        type="url"
                                        className="form-input"
                                        placeholder="https://..."
                                        value={form.image1}
                                        onChange={(e) => setForm({ ...form, image1: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Image URL 2</label>
                                    <input
                                        type="url"
                                        className="form-input"
                                        placeholder="https://..."
                                        value={form.image2}
                                        onChange={(e) => setForm({ ...form, image2: e.target.value })}
                                    />
                                </div>
                            </div>

                            <h3 className="stock-heading">Stock per Size</h3>
                            <div className="stock-row">
                                {[5, 6, 7, 8, 9, 10].map((size) => (
                                    <div key={size} className="stock-field">
                                        <label>Size {size}</label>
                                        <input
                                            type="number"
                                            className="form-input"
                                            min="0"
                                            value={form[`size${size}`]}
                                            onChange={(e) => setForm({ ...form, [`size${size}`]: e.target.value })}
                                        />
                                    </div>
                                ))}
                            </div>

                            <button type="submit" className="btn btn-primary add-submit-btn">
                                ➕ Add Product
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}
