import React from "react";
// REACT ROUTER
import { Routes, Route } from "react-router-dom";
// PAGE COMPONENTS
import Home from "./pages/Home";
import About from "./pages/About";
import SingleProduct from "./pages/SingleProduct";
import Products from "./pages/Products";
import PageNotFound from "./pages/PageNotFound";
import Layout from "./pages/Layout";
// SASS
import "./sass/main.scss";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="shop">
          <Route index element={<Products />} />
          <Route path=":category" element={<Products />} />
        </Route>
        <Route path="/shop/:category/:id" element={<SingleProduct />} />

        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
