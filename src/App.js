import React from "react";
// REACT ROUTER
import { Routes, Route } from "react-router-dom";
// PAGE COMPONENTS
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";
import Layout from "./pages/Layout";
// SASS
import "./sass/main.scss";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
