import { createContext, useContext, useState, useEffect } from 'react';
import {
    collection,
    doc,
    setDoc,
    deleteDoc,
    updateDoc,
    onSnapshot,
    getDocs,
    writeBatch,
} from 'firebase/firestore';
import { db } from '../firebase';
import INITIAL_PRODUCTS from '../data/products';

const ProductContext = createContext();

const PRODUCTS_COLLECTION = 'products';

export function ProductProvider({ children }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Real-time listener — syncs Firestore → local state for ALL users
    useEffect(() => {
        const productsRef = collection(db, PRODUCTS_COLLECTION);

        const unsubscribe = onSnapshot(productsRef, async (snapshot) => {
            if (snapshot.empty) {
                // First time: seed Firestore with default products
                try {
                    const batch = writeBatch(db);
                    INITIAL_PRODUCTS.forEach((product) => {
                        const docRef = doc(productsRef, String(product.id));
                        batch.set(docRef, product);
                    });
                    await batch.commit();
                    // onSnapshot will fire again after seeding — products will load then
                } catch (e) {
                    console.error('Error seeding products:', e);
                    // Fallback to hardcoded data if Firestore fails
                    setProducts(INITIAL_PRODUCTS);
                }
            } else {
                const productsData = snapshot.docs.map((doc) => ({
                    ...doc.data(),
                    _docId: doc.id,
                }));

                // Auto-generate MRP for products that don't have one
                const mrpMarkups = [899, 999, 1299];
                const productsNeedingMrp = productsData.filter((p) => !p.mrp && p.price);
                if (productsNeedingMrp.length > 0) {
                    try {
                        const batch = writeBatch(db);
                        productsNeedingMrp.forEach((p) => {
                            const markup = mrpMarkups[Math.floor(Math.random() * mrpMarkups.length)];
                            const generatedMrp = p.price + markup;
                            const docRef = doc(db, PRODUCTS_COLLECTION, p._docId);
                            batch.update(docRef, { mrp: generatedMrp });
                            // Also update local data immediately
                            p.mrp = generatedMrp;
                        });
                        await batch.commit();
                        console.log(`Auto-generated MRP for ${productsNeedingMrp.length} products`);
                    } catch (e) {
                        console.error('Error auto-generating MRP:', e);
                    }
                }

                // Sort by id to maintain consistent order
                productsData.sort((a, b) => a.id - b.id);
                setProducts(productsData);
            }
            setLoading(false);
        }, (error) => {
            console.error('Firestore listener error:', error);
            // Fallback to hardcoded data
            setProducts(INITIAL_PRODUCTS);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const addProduct = async (product) => {
        const newProduct = {
            ...product,
            id: Date.now(),
        };
        try {
            const docRef = doc(collection(db, PRODUCTS_COLLECTION), String(newProduct.id));
            await setDoc(docRef, newProduct);
        } catch (e) {
            console.error('Error adding product:', e);
        }
        return newProduct;
    };

    const updateProduct = async (id, updates) => {
        try {
            const docRef = doc(db, PRODUCTS_COLLECTION, String(id));
            await updateDoc(docRef, updates);
        } catch (e) {
            console.error('Error updating product:', e);
        }
    };

    const deleteProduct = async (id) => {
        try {
            const docRef = doc(db, PRODUCTS_COLLECTION, String(id));
            await deleteDoc(docRef);
        } catch (e) {
            console.error('Error deleting product:', e);
        }
    };

    const updateStock = async (id, size, newStock) => {
        try {
            const docRef = doc(db, PRODUCTS_COLLECTION, String(id));
            await updateDoc(docRef, {
                [`sizes.${size}`]: Math.max(0, newStock),
            });
        } catch (e) {
            console.error('Error updating stock:', e);
        }
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

    const resetProducts = async () => {
        try {
            // Delete all existing products
            const productsRef = collection(db, PRODUCTS_COLLECTION);
            const snapshot = await getDocs(productsRef);
            const batch = writeBatch(db);
            snapshot.docs.forEach((doc) => batch.delete(doc.ref));
            await batch.commit();

            // Re-seed with defaults
            const seedBatch = writeBatch(db);
            INITIAL_PRODUCTS.forEach((product) => {
                const docRef = doc(productsRef, String(product.id));
                seedBatch.set(docRef, product);
            });
            await seedBatch.commit();
        } catch (e) {
            console.error('Error resetting products:', e);
        }
    };

    return (
        <ProductContext.Provider
            value={{
                products,
                loading,
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
