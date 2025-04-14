import React from 'react';
import NavBar from './components/NavBar';
import ItemListContainer from './components/ItemListContainer';

const App = () => {
    const welcomeMessage = "¡Bienvenidos a mi tienda!";

    return (
        <div>
            <NavBar />
            <ItemListContainer welcomeMessage={welcomeMessage} />
        </div>
    );
};

export default App;