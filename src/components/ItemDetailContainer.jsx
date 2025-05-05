import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ItemDetailContainer = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const productDetails = {
        1: { name: 'Ranita', description: 'Pantalon de algodón con piecitos', price: 500 },
        2: { name: 'Body', description: 'Comfortable body de algodón', price: 20 },
        3: { name: 'Dona', description: 'Dona para amamantar al bebe', price: 10 },
      };
      setProduct(productDetails[productId]);
      setLoading(false);
    }, 2000); 
  }, [productId]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>Precio: {product.price} $</p>
          <button>Añadir</button>
        </div>
      )}
    </div>
  );
};

export default ItemDetailContainer;
