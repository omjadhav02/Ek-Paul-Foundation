import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <h1>Ek Paul Foundation</h1>
      <nav>
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Donate</li>
          <li>Volunteer</li>
          <li>Gallery</li>
          <li>Contact</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
