import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCtv7Qh1UX8sT76Dgr-CNv4k7rqf-h4Zsc",
    authDomain: "babyshop-5d482.firebaseapp.com",
    projectId: "babyshop-5d482",
    storageBucket: "babyshop-5d482.firebasestorage.app",
    messagingSenderId: "61866443604",
    appId: "1:61866443604:web:c8604cd2253b196abc7ec1"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
