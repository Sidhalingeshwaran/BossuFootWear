// Utility to seed initial products into Firestore
import { collection, doc, setDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import INITIAL_PRODUCTS from '../data/products';

/**
 * Seeds products into Firestore. Only seeds if the collection is empty.
 * @param {boolean} force - If true, seeds even if products already exist (used for reset)
 */
export async function seedProducts(force = false) {
    const productsRef = collection(db, 'products');

    if (!force) {
        const snapshot = await getDocs(productsRef);
        if (!snapshot.empty) {
            return false; // Already has products, skip seeding
        }
    }

    // Write each product with its original ID as the document ID
    const promises = INITIAL_PRODUCTS.map((product) =>
        setDoc(doc(productsRef, String(product.id)), product)
    );

    await Promise.all(promises);
    return true; // Seeded successfully
}

export default seedProducts;
