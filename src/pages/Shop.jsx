import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';
import './Shop.css';

export default function Shop() {
    const { getFilteredProducts, getCategories, getTypes } = useProducts();
    const [searchParams, setSearchParams] = useSearchParams();

    const [filters, setFilters] = useState({
        category: searchParams.get('category') || '',
        type: searchParams.get('type') || '',
        search: '',
        sort: 'default',
    });

    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

    // Update filters when URL changes
    useEffect(() => {
        const cat = searchParams.get('category') || '';
        const type = searchParams.get('type') || '';
        setFilters((prev) => ({ ...prev, category: cat, type: type }));
    }, [searchParams]);

    const categories = getCategories();
    const types = getTypes();

    let products = getFilteredProducts({
        category: filters.category,
        type: filters.type,
        search: filters.search,
    });

    // Sort
    if (filters.sort === 'price-low') {
        products = [...products].sort((a, b) => a.price - b.price);
    } else if (filters.sort === 'price-high') {
        products = [...products].sort((a, b) => b.price - a.price);
    } else if (filters.sort === 'name') {
        products = [...products].sort((a, b) => a.name.localeCompare(b.name));
    }

    const handleFilterChange = (key, value) => {
        const newFilters = { ...filters, [key]: value };
        setFilters(newFilters);

        // Also update URL params for category/type
        const params = new URLSearchParams();
        if (key === 'category' && value) params.set('category', value);
        else if (filters.category && key !== 'category') params.set('category', filters.category);
        if (key === 'type' && value) params.set('type', value);
        else if (filters.type && key !== 'type') params.set('type', filters.type);
        setSearchParams(params);
    };

    const clearFilters = () => {
        setFilters({ category: '', type: '', search: '', sort: 'default' });
        setSearchParams({});
    };

    const activeFilterCount = [filters.category, filters.type, filters.search].filter(Boolean).length;

    return (
        <div className="shop-page">
            <div className="container">
                {/* Header */}
                <div className="shop-header">
                    <div>
                        <h1 className="shop-title">
                            {filters.category ? `${filters.category}'s Collection` : 'All Products'}
                        </h1>
                        <p className="shop-count">{products.length} products found</p>
                    </div>
                    <div className="shop-header-actions">
                        <button
                            className="btn btn-secondary btn-sm mobile-filter-btn"
                            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                        >
                            ☰ Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
                        </button>
                    </div>
                </div>

                <div className="shop-layout">
                    {/* Sidebar */}
                    <aside className={`shop-sidebar ${mobileFiltersOpen ? 'open' : ''}`}>
                        <div className="sidebar-header">
                            <h3 className="sidebar-title">Filters</h3>
                            {activeFilterCount > 0 && (
                                <button className="clear-btn" onClick={clearFilters}>
                                    Clear All
                                </button>
                            )}
                        </div>

                        {/* Search */}
                        <div className="filter-group">
                            <label className="filter-label">Search</label>
                            <input
                                type="text"
                                className="form-input"
                                placeholder="Search products..."
                                value={filters.search}
                                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                            />
                        </div>

                        {/* Category */}
                        <div className="filter-group">
                            <label className="filter-label">Category</label>
                            <div className="filter-chips">
                                <button
                                    className={`filter-chip ${!filters.category ? 'active' : ''}`}
                                    onClick={() => handleFilterChange('category', '')}
                                >
                                    All
                                </button>
                                {categories.map((cat) => (
                                    <button
                                        key={cat}
                                        className={`filter-chip ${filters.category === cat ? 'active' : ''}`}
                                        onClick={() => handleFilterChange('category', cat)}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Type */}
                        <div className="filter-group">
                            <label className="filter-label">Type</label>
                            <div className="filter-chips">
                                <button
                                    className={`filter-chip ${!filters.type ? 'active' : ''}`}
                                    onClick={() => handleFilterChange('type', '')}
                                >
                                    All
                                </button>
                                {types.map((t) => (
                                    <button
                                        key={t}
                                        className={`filter-chip ${filters.type === t ? 'active' : ''}`}
                                        onClick={() => handleFilterChange('type', t)}
                                    >
                                        {t}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Sort */}
                        <div className="filter-group">
                            <label className="filter-label">Sort By</label>
                            <select
                                className="form-input"
                                value={filters.sort}
                                onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
                            >
                                <option value="default">Default</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                                <option value="name">Name: A-Z</option>
                            </select>
                        </div>

                        <button
                            className="btn btn-secondary btn-sm mobile-close-btn"
                            onClick={() => setMobileFiltersOpen(false)}
                        >
                            Apply Filters
                        </button>
                    </aside>

                    {/* Products Grid */}
                    <div className="shop-products">
                        {products.length === 0 ? (
                            <div className="no-products">
                                <span className="no-products-icon">🔍</span>
                                <h3>No products found</h3>
                                <p>Try adjusting your filters or search term</p>
                                <button className="btn btn-secondary btn-sm" onClick={clearFilters}>
                                    Clear Filters
                                </button>
                            </div>
                        ) : (
                            <div className="products-grid">
                                {products.map((product, i) => (
                                    <div
                                        key={product.id}
                                        className="animate-fadeInUp"
                                        style={{ animationDelay: `${i * 0.05}s` }}
                                    >
                                        <ProductCard product={product} />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
