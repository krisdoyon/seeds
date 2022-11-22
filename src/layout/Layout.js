import React from "react";
import { Outlet } from "react-router-dom";
import Banner from "./Banner";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = () => {
  return (
    <>
      <Banner />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
