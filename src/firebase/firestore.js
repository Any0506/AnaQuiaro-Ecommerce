import { db } from "./firebaseConfig";
import { collection, getDocs, doc, getDoc, query, where } from "firebase/firestore";

export const fetchProducts = async () => {
  const productsCol = collection(db, "products");
  const productsSnapshot = await getDocs(productsCol);
  const productsList = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return productsList;
};

export const fetchProductsByCategory = async (category) => {
  try {
    console.log("category:", category);
    const productsCol = collection(db, "products");

    if (!category) {
      const snapshot = await getDocs(productsCol);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }

    const q = query(productsCol, where("category", "==", category));
    const snapshot = await getDocs(q);

    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error en fetchProductsByCategory:", error);
    return [];
  }
};

export const fetchProductById = async (id) => {
  const docRef = doc(db, "products", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  } else {
    throw new Error("Producto no encontrado");
  }
};