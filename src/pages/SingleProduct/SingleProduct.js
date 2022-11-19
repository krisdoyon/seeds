import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context/context";
import Breadcrumb from "../../components/Breadcrumb";

const SingleProduct = () => {
  const { id } = useParams();
  const { getProduct } = useGlobalContext();
  const product = getProduct(id);
  const navigate = useNavigate();

  return (
    <div className="container">
      <Breadcrumb title={product.title} category={product.category} product />
      <button onClick={() => navigate(-1)}>Back</button>
      <h1>{product.title}</h1>
      <img src={`/img/${product.id}.webp`} alt="" />
    </div>
  );
};

export default SingleProduct;
