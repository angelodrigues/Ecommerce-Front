import React from 'react';
import './Navegation.css';

import './Navegation.css';

export default function Navigation() {
  return (
    <header className="nav-container">
      <div className="logo">Lirili larila</div>
      <nav>
        <a href="#">Home</a>
        <a href="#">Products</a>
        <a href="#">Recomendations</a>
      </nav>
      <button className="contact-button">Contact us</button>
    </header>
  );
}
