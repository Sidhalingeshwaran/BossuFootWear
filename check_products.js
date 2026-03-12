import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import fs from 'fs';

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

async function checkProducts() {
    const snapshot = await getDocs(collection(db, 'products'));
    let out = `Total products in Firestore: ${snapshot.size}\n\n`;

    snapshot.docs.forEach((doc, i) => {
        const d = doc.data();
        const hasMrp = d.mrp ? `MRP: ₹${d.mrp}` : 'NO MRP';
        out += `${i + 1}. [${d.category}] ${d.name} — ₹${d.price} (${hasMrp})\n`;
    });

    fs.writeFileSync('products_list.txt', out);
    console.log('Saved to products_list.txt');
    process.exit(0);
}

checkProducts().catch(e => { console.error(e); process.exit(1); });
