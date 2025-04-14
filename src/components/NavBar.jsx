import React from 'react';
import CartWidget from './CartWidget';
import logo from '../assets/logo.png'

const NavBar = () => {
    return (
        <nav>
            <div className="logo">
                <img src={logo} alt="Mi Tienda" />
                Mi Tienda
            </div>
            <ul>
                <li><a href="#home">Inicio</a></li>
                <li><a href="#products">Productos</a></li>
                <li><a href="#about">Acerca de</a></li>
            </ul>
            <CartWidget />
        </nav>
    );
};

export default NavBar;