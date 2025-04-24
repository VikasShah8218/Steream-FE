import React from "react";
import { Outlet } from "react-router-dom";
import "./nav.css"

const Header: React.FC = () => {

  return (
    <>
    <Outlet />
    </>
    
  );
};

export default Header;
