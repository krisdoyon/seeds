import { useState } from "react";
import styles from "./Shop.module.scss";
import { useParams } from "react-router-dom";
import ProductNav from "./ProductNav";
import ProductCard from "./ProductCard";
import Breadcrumb from "../../components/Breadcrumb";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { loadProducts } from "../../features/productsSlice";
import PageNotFound from "../PageNotFound";
import Button from "../../components/Button";
import { updateSort } from "../../features/productsSlice";
import { FaBars } from "react-icons/fa";
import Overlay from "../../components/Overlay";

const PRODUCTS_TO_LOAD = 12;

const Shop = () => {
  const { category } = useParams();
  const dispatch = useDispatch();
  const { filters, sort } = useSelector((state) => state.products);
  const [numProducts, setNumProducts] = useState(PRODUCTS_TO_LOAD);
  const [isNavOpen, setIsNavOpen] = useState(false);

  useEffect(() => {
    dispatch(loadProducts(category));
  }, [category, filters, dispatch, sort]);

  useEffect(() => {
    setNumProducts(PRODUCTS_TO_LOAD);
  }, [category]);

  const { products, error } = useSelector((state) => state.products);

  if (error) {
    return <PageNotFound />;
  }

  return (
    <section className={`container ${styles.wrapper}`}>
      <Breadcrumb title={category || "shop"} category={category} />
      <div className={styles.content}>
        <ProductNav isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />
        {isNavOpen && <Overlay />}
        <div className={styles.products}>
          <header className={styles.header}>
            <div className={styles["header-info"]}>
              <h2 className={styles.heading}>{category || "all"}</h2>
              <span>{`${products.length} matching ${
                products.length === 1 ? "product" : "products"
              }`}</span>
            </div>
            <div className={styles["header-row"]}>
              <Button
                className={styles["nav-btn"]}
                fill
                onClick={() => setIsNavOpen(true)}
              >
                <FaBars />
              </Button>
              <select onChange={(e) => dispatch(updateSort(e.target.value))}>
                <option value="title-descending">Title (A-Z)</option>
                <option value="title-ascending">Title (Z-A)</option>
                <option value="price-ascending">Price (Low to High)</option>
                <option value="price-descending">Price (High to Low)</option>
              </select>
            </div>
          </header>
          {products.slice(0, numProducts).map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
          {numProducts < products.length && (
            <Button
              fill
              className={styles["btn-load"]}
              onClick={() =>
                setNumProducts((prevNum) => prevNum + PRODUCTS_TO_LOAD)
              }
            >
              LOAD MORE
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Shop;
