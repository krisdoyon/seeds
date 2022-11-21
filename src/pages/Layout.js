import React from "react";
import { Outlet } from "react-router-dom";
import Banner from "../components/Banner";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

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
