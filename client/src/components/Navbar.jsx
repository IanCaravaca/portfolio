import "./navbar.css";
import Container from "../layouts/Container";
import { useState } from "react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <nav>
        <Container>
          <h2>🚀 Ian Portfolio</h2>
          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "✕" : "☰"}
          </button>

          <ul className={menuOpen ? "nav-menu open" : "nav-menu"}>
            <li>Inicio</li>
            <li>Sobre mí</li>
            <li>Proyectos</li>
            <li>Contacto</li>
          </ul>
        </Container>
      </nav>
    </>
  );
}
export default Navbar;
