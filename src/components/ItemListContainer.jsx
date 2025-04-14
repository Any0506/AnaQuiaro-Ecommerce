import React from 'react';

const ItemListContainer = (props) => {
    return (
        <div className="item-list-container">
            <h1>{props.welcomeMessage}</h1>
        </div>
    );
};

export default ItemListContainer;