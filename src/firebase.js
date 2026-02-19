// Firebase configuration for BossuFootWear
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

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
export const db = getFirestore(app);
export default app;
