import React from "react";
import {Link} from 'react-router-dom';
const Navbar = () => {
  return (
    <div className="container">
      <nav class="navbar navbar-expand-lg navbar-dark px-3" style={{backgroundColor:'#095252',marginBottom:'30px',fontFamily:'New Times Roman'}}>
        <Link class="navbar-brand" to="/">
          Cscore <span>&#127951;</span>
        </Link>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
          <li class="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li class="nav-item active">
              <Link className="nav-link" to="/guide">
                Guide
              </Link>
            </li>
            <li class="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
            </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
