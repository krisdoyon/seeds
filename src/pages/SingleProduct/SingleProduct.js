import React from "react";
import { useParams } from "react-router-dom";
import products from "../../data/seeds.json";

const Product = () => {
  const { id } = useParams();
  const product = products.find((product) => product.id === id);
  return <div>{product.title}</div>;
};

export default Product;
