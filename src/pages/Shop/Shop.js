import styles from "./Shop.module.scss";
import { useParams } from "react-router-dom";
import ProductNav from "./ProductNav";
import ProductCard from "./ProductCard";
import Breadcrumb from "../../components/Breadcrumb";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { loadProducts } from "../../features/productsSlice";
import PageNotFound from "../PageNotFound";

const Shop = () => {
  const { category } = useParams();
  const dispatch = useDispatch();
  const { filters } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(loadProducts(category));
  }, [category, filters, dispatch]);

  const { products, error } = useSelector((state) => state.products);

  if (error) {
    return <PageNotFound />;
  }

  return (
    <section className={`container ${styles.wrapper}`}>
      <Breadcrumb title={category || "shop"} category={category} />
      <div className={styles.content}>
        <ProductNav />
        <div className={styles.products}>
          <header className={styles.header}>
            <h2 className={styles.heading}>{category || "all"}</h2>
            <span>{`${products.length} matching ${
              products.length === 1 ? "product" : "products"
            }`}</span>
          </header>
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Shop;
