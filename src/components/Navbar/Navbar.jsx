// Navbar.js

import React from 'react';
import './Navbar.css'; // Import the CSS file for styling
import PostSection  from '../../pages/postsection/PostSection';

function Navbar() {
  return (
    <header>
      <nav className="navbar">
        <div className="logo">
          <img src="https://4.bp.blogspot.com/-7SFX4QOxz_c/UPXahvkog3I/AAAAAAAAFHg/ngzSSdeBQDc/s1600/Logo+Blogger.JPG" alt="Logo" />
        </div>
        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/write">Write</a></li>
          {/* <li><a href="#">Add</a></li> */}
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;

