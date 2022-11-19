import React, { useContext } from "react";
import allProducts from "../data/seeds.json";

const appContext = React.createContext();

const AppProvider = ({ children }) => {
  const allCategories = [
    ...new Set(allProducts.map((product) => product.category)),
  ].sort((a, b) => a.localeCompare(b));

  const getProducts = (category) => {
    const products =
      category === "all"
        ? allProducts
        : allProducts.filter((product) => product.category === category);
    return products.sort((a, b) => a.title.localeCompare(b.title));
  };

  const getProduct = (id) => {
    return allProducts.find((product) => product.id === id);
  };

  return (
    <appContext.Provider value={{ allCategories, getProducts, getProduct }}>
      {children}
    </appContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(appContext);
};

export { AppProvider, useGlobalContext };
