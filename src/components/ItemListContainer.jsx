import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ItemList from './ItemList';

const ItemListContainer = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const allProducts = [
        { id: 1, name: 'Ranita', category: 'boy' },
        { id: 2, name: 'Body', category: 'girl' },
        { id: 3, name: 'Dona', category: 'mother' },
      ];

      const filteredProducts = categoryId
        ? allProducts.filter(product => product.category === categoryId)
        : allProducts;

      setProducts(filteredProducts);
      setLoading(false);
    }, 2000); 
  }, [categoryId]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ItemList products={products} />
      )}
    </div>
  );
};

export default ItemListContainer;
