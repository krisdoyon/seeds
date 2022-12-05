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
  const { currentProducts, notFound, isLoading } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (!isLoading) {
      dispatch(loadProducts(category));
    }
  }, [category, filters, dispatch, sort, isLoading]);

  useEffect(() => {
    setNumProducts(PRODUCTS_TO_LOAD);
  }, [category]);

  if (notFound) {
    return <PageNotFound />;
  }

  if (!isLoading) {
    return (
      <section>
        <Breadcrumb title={category || "shop"} category={category} />
        <div className={styles.content}>
          <ProductNav isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />
          {isNavOpen && <Overlay />}
          {currentProducts !== null && (
            <div className={styles.products}>
              <header className={styles.header}>
                <div className={styles["header-info"]}>
                  <h2 className={styles.heading}>{category || "all"}</h2>
                  <span>{`${currentProducts.length} matching ${
                    currentProducts.length === 1 ? "product" : "products"
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
                  <select
                    value={sort}
                    onChange={(e) => dispatch(updateSort(e.target.value))}
                  >
                    <option value="title-descending">Title (A-Z)</option>
                    <option value="title-ascending">Title (Z-A)</option>
                    <option value="price-ascending">Price (Low to High)</option>
                    <option value="price-descending">
                      Price (High to Low)
                    </option>
                  </select>
                </div>
              </header>
              {currentProducts.slice(0, numProducts).map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
              {numProducts < currentProducts.length && (
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
          )}
        </div>
      </section>
    );
  }
};

export default Shop;
