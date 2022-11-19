import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context/context";

const Product = () => {
  const { id } = useParams();
  const { getProduct } = useGlobalContext();
  const product = getProduct(id);
  const navigate = useNavigate();

  return (
    <div className="container">
      <button onClick={() => navigate(-1)}>Back</button>
      <h1>{product.title}</h1>
      <img src={`/img/${product.id}.webp`} alt="" />
    </div>
  );
};

export default Product;
