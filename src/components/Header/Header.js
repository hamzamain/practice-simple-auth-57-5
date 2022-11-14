import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <div className="header bg-primary ">
      <Link to={"/register"}>Register</Link>
      <Link to={"/login"}>Login</Link>
    </div>
  );
};

export default Header;
