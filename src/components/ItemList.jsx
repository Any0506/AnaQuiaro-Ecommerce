import React from 'react';
import { Link } from 'react-router-dom';

const ItemList = ({ products }) => {
  return (
    <div>
      {products.map(product => (
        <div key={product.id}>
          <Link to={`/product/${product.id}`}>
            <h3>{product.name}</h3>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ItemList;
