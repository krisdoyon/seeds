import { useParams } from "react-router-dom";
import ProductNav from "../../components/ProductNav";
import { useGlobalContext } from "../../context/context";
import ProductCard from "./ProductCard";
import styled from "styled-components";

const Wrapper = styled.div`
  .heading {
    text-transform: capitalize;
    padding: 4rem 0;
    font-size: 3.2rem;
  }

  .content {
    display: grid;
    grid-template-columns: 25rem 1fr;
    gap: 1rem;
  }

  .products {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }
`;

const Products = () => {
  const { category } = useParams();
  const { getProducts } = useGlobalContext();
  const products = getProducts(category || "all");

  return (
    <Wrapper className="container">
      <h2 className="heading">{category || "all"}</h2>
      <div className="content">
        <ProductNav />
        <div className="products">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </Wrapper>
  );
};

export default Products;
