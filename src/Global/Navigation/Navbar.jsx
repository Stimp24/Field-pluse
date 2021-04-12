import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div class="container">
      <header class="d-flex justify-content-center py-3">
        <ul class="nav nav-pills">
          <li class="nav-item">
            <Link to="/" class="nav-link">
              Home
            </Link>
          </li>
        </ul>
      </header>
    </div>
  );
};
export default Navbar;
