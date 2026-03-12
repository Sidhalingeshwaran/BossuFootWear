import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, writeBatch } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDsUvtoaQ_91xDciN-sNgnh-7vciH7sJEY",
    authDomain: "bossufootwear.firebaseapp.com",
    projectId: "bossufootwear",
    storageBucket: "bossufootwear.firebasestorage.app",
    messagingSenderId: "906890164279",
    appId: "1:906890164279:web:0e333f6553fc382b75a7b2",
    measurementId: "G-YBYH8ES3WJ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function wipeProducts() {
    const snapshot = await getDocs(collection(db, 'products'));
    const batch = writeBatch(db);

    if (snapshot.empty) {
        console.log('Firestore is already empty.');
        process.exit(0);
    }

    console.log(`Found ${snapshot.size} products. Deleting all of them...`);

    snapshot.docs.forEach((doc) => {
        batch.delete(doc.ref);
    });

    await batch.commit();
    console.log('Successfully deleted all products from Firestore.');
    process.exit(0);
}

wipeProducts().catch(e => { console.error('Error wiping products:', e); process.exit(1); });
