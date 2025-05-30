import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProducts, fetchProductsByCategory } from "../firebase/firestore";
import ItemList from "./ItemList";

const ItemListContainer = () => {
  const { category } = useParams(); // recibe "ropa", "juguetes", etc.
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchProductsByCategory(category)
      .then((data) => {
        setProductos(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error cargando productos:", error);
        setLoading(false);
      });
  }, [category]);

  if (loading) return <p>Cargando productos...</p>;
  if (productos.length === 0) return <p>No hay productos para mostrar.</p>;

  return <ItemList productos={productos} />;
};

export default ItemListContainer;