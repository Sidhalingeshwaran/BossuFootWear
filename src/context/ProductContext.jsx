import { createContext, useContext, useState, useEffect } from 'react';
import INITIAL_PRODUCTS from '../data/products';

const ProductContext = createContext();

const STORAGE_KEY = 'bossu_products';

export function ProductProvider({ children }) {
    const [products, setProducts] = useState(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                return JSON.parse(stored);
            }
        } catch (e) {
            console.error('Error reading products from localStorage:', e);
        }
        return INITIAL_PRODUCTS;
    });

    // Persist to localStorage whenever products change
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
        } catch (e) {
            console.error('Error saving products to localStorage:', e);
        }
    }, [products]);

    const addProduct = (product) => {
        const newProduct = {
            ...product,
            id: Date.now(),
        };
        setProducts((prev) => [...prev, newProduct]);
        return newProduct;
    };

    const updateProduct = (id, updates) => {
        setProducts((prev) =>
            prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
        );
    };

    const deleteProduct = (id) => {
        setProducts((prev) => prev.filter((p) => p.id !== id));
    };

    const updateStock = (id, size, newStock) => {
        setProducts((prev) =>
            prev.map((p) => {
                if (p.id === id) {
                    return {
                        ...p,
                        sizes: { ...p.sizes, [size]: Math.max(0, newStock) },
                    };
                }
                return p;
            })
        );
    };

    const getProduct = (id) => products.find((p) => p.id === Number(id));

    const getFilteredProducts = ({ category, type, search, priceRange } = {}) => {
        return products.filter((p) => {
            if (category && p.category !== category) return false;
            if (type && p.type !== type) return false;
            if (search) {
                const q = search.toLowerCase();
                if (
                    !p.name.toLowerCase().includes(q) &&
                    !p.type.toLowerCase().includes(q) &&
                    !p.description.toLowerCase().includes(q)
                )
                    return false;
            }
            if (priceRange) {
                if (p.price < priceRange[0] || p.price > priceRange[1]) return false;
            }
            return true;
        });
    };

    const getCategories = () => [...new Set(products.map((p) => p.category))];
    const getTypes = () => [...new Set(products.map((p) => p.type))];

    const resetProducts = () => {
        setProducts(INITIAL_PRODUCTS);
    };

    return (
        <ProductContext.Provider
            value={{
                products,
                addProduct,
                updateProduct,
                deleteProduct,
                updateStock,
                getProduct,
                getFilteredProducts,
                getCategories,
                getTypes,
                resetProducts,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
}

export function useProducts() {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error('useProducts must be used within a ProductProvider');
    }
    return context;
}

export default ProductContext;
