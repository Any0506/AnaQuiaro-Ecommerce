import React from "react";
import { Link } from "react-router-dom";
import Menu from "./Menu";
import CartWidget from "./CartWidget";
import "./NavBar.css";

const NavBar = () => {
  return (
    <header className="navbar">
      <div className="navbar__logo">
        <h1>AnaQuiaro Bebés</h1>
      </div>
      <Menu />
      {/* CartWidget dentro del Link para navegar a /cart */}
      <Link to="/cart" className="navbar__cartLink">
        <CartWidget />
      </Link>
    </header>
  );
};

export default NavBar;
