import { Link } from "react-router-dom";
import "./Menu.css";

const Menu = () => {
  return (
    <nav className="menu">
      <ul>
        <li><Link to="/category/ropa">Ropa</Link></li>
        <li><Link to="/category/juguetes">Juguetes</Link></li>
        <li><Link to="/category/higiene">Higiene</Link></li>
        <li><Link to="/category/accesorios">Accesorios</Link></li>
        <li><Link to="/category/alimentacion">Alimentación</Link></li>
        <li><Link to="/category/ofertas">Ofertas</Link></li>
      </ul>
    </nav>
  );
};

export default Menu;
