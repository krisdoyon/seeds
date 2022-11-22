import { useNavigate, useParams } from "react-router-dom";
import ProductNav from "./ProductNav";
import ProductCard from "./ProductCard";
import Breadcrumb from "../../components/Breadcrumb";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { loadProducts } from "../../features/productsSlice";
import PageNotFound from "../PageNotFound";

const Wrapper = styled.div`
  margin-top: var(--container-margin-top);

  .heading {
    text-transform: capitalize;
    margin-bottom: 0.6rem;
    font-size: 3.2rem;
  }

  .content {
    display: grid;
    grid-template-columns: 28rem 1fr;
    gap: 1rem;
    margin-top: 3rem;
  }

  .products {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: max-content;
    gap: 1rem;

    &__header {
      grid-column: 1/-1;
      margin-bottom: 1.8rem;
      gap: 1.4rem;
    }
  }
`;

const Shop = () => {
  let { category } = useParams();
  const dispatch = useDispatch();
  const { filters } = useSelector((state) => state.products);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(loadProducts(category));
  }, [category, filters]);

  const { products, error } = useSelector((state) => state.products);

  if (error) {
    return <PageNotFound />;
  }

  return (
    <Wrapper className="container">
      <Breadcrumb title={category || "shop"} category={category} />
      <div className="content">
        <ProductNav />
        <div className="products">
          <header className="products__header">
            <h2 className="heading">{category || "all"}</h2>
            <span>{`${products.length} matching ${
              products.length === 1 ? "product" : "products"
            }`}</span>
          </header>

          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </Wrapper>
  );
};

export default Shop;