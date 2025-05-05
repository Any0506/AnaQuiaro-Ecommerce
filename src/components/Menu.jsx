import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
  const categories = ['Boy', 'Girl', 'Mother'];  

  return (
    <nav>
      <ul>
        {categories.map((category, index) => (
          <li key={index}>
            <Link to={`/category/${category.toLowerCase()}`}>{category}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Menu;
