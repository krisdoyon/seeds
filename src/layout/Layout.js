import React from "react";
// import { Outlet } from "react-router-dom";
import Banner from "./Banner";
import Navbar from "./Navbar";
import Footer from "./Footer";
import PromoButton from "./PromoButton";

const Layout = ({ children }) => {
  return (
    <>
      <Banner />
      <Navbar />
      {/* <Outlet /> */}
      <main className="container">{children}</main>
      <PromoButton />
      <Footer />
    </>
  );
};

export default Layout;
