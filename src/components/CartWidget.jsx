import React from 'react';
import carrito from '../assets/carritocompras.png'

const CartWidget = () => {
    return (
        <div className="cart-widget">
            <img src={carrito} alt="Mi Tienda" />
        </div>
    );
};

export default CartWidget;