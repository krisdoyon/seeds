import React from "react";
import { Link } from "react-router-dom";
import products from "../../data/seeds.json";

const Shop = () => {
  return (
    <div>
      {products.map((product) => {
        const { id } = product;
        return (
          <Link key={id} to={`/shop/${id}`}>
            {product.title}
          </Link>
        );
      })}
    </div>
  );
};

export default Shop;
