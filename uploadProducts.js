import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";
import fs from "fs/promises";

// 🔧 Configura tu Firebase aquí:
const firebaseConfig = {
  apiKey: "AIzaSyCtv7Qh1UX8sT76Dgr-CNv4k7rqf-h4Zsc",
  authDomain: "babyshop-5d482.firebaseapp.com",
  projectId: "babyshop-5d482",
  storageBucket: "babyshop-5d482.firebasestorage.app",
  messagingSenderId: "61866443604",
  appId: "1:61866443604:web:c8604cd2253b196abc7ec1"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 📦 Leer productos desde tu JSON (array)
async function loadProducts() {
  const data = await fs.readFile(new URL("./data/productos.json", import.meta.url), "utf-8");
  return JSON.parse(data);
}

async function uploadProducts() {
  try {
    const products = await loadProducts();
    const collectionRef = collection(db, "products");

    for (const [index, product] of products.entries()) {
      const docRef = doc(collectionRef); // ID automático
      await setDoc(docRef, product);
      console.log(`✅ Producto ${index + 1} subido: ${product.name}`);
    }

    console.log("🎉 Todos los productos fueron subidos correctamente.");
  } catch (error) {
    console.error("❌ Error al subir productos:", error.message);
  }
}

uploadProducts();