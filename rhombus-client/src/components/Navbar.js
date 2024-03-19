import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className='nav-link' to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className='nav-link' to="/author">Author</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
