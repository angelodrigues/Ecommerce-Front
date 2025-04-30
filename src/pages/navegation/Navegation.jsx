import React from 'react';
import './Navegation.css';

import './Navegation.css';

export default function Navigation() {
  return (
    <header className="nav-container">
      <div className="logo">Looks</div>
      <nav>
        <a href="#">Home</a>
        <a href="#">About us</a>
        <a href="#">Our services</a>
        <a href="#">Gallery</a>
      </nav>
      <button className="contact-button">Contact us</button>
    </header>
  );
}
