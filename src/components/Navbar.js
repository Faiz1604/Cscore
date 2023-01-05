import React from "react";
import {Link} from 'react-router-dom';
const Navbar = () => {
  function setNewGame(){
    window.location="/"
    sessionStorage.clear();
  }
  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-dark px-3" style={{backgroundColor:'#095252',marginBottom:'30px',fontFamily:'New Times Roman'}}>
        <Link className="navbar-brand" to="/">
          Cscore <span>&#127951;</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
          <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" to="/guide">
                Guide
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
            </ul>
        </div>
        <div className="nav-item">
        <button className="nav-link" style={{border:"0px",backgroundColor:"#095252",color:"white",fontSize:"xx-large"}}
        onClick={setNewGame}>+</button>
      </div>
      </nav>
      
    </div>
  );
};

export default Navbar;
