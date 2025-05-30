import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../firebase/firestore";
import ItemCount from "./ItemCount";
import { CartContext } from "../context/CartContext";

const ItemDetailContainer = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cantidadAgregada, setCantidadAgregada] = useState(0);
  const { addItem } = useContext(CartContext);

  useEffect(() => {
    setLoading(true);
    fetchProductById(id)
      .then((prod) => {
        setProducto(prod);
        setLoading(false);
      })
      .catch(() => {
        setProducto(null);
        setLoading(false);
      });
  }, [id]);

  const handleAdd = (cantidad) => {
    addItem(producto, cantidad);
    setCantidadAgregada(cantidad);
  };

  if (loading) return <p>Cargando producto...</p>;
  if (!producto) return <p>Producto no encontrado.</p>;

  return (
    <div>
      <h2>{producto.name}</h2>
      <img src={producto.image} alt={producto.name} style={{ maxWidth: "300px" }} />
      <p>{producto.description}</p>
      <p>Precio: ${producto.price}</p>

      {cantidadAgregada === 0 ? (
        <ItemCount stock={producto.stock} initial={1} onAdd={handleAdd} />
      ) : (
        <p>Agregaste {cantidadAgregada} unidad(es) al carrito.</p>
      )}
    </div>
  );
};

export default ItemDetailContainer;