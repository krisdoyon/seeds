import styles from "./Inventory.module.scss";
import Breadcrumb from "../../components/Breadcrumb";
import { useSelector } from "react-redux";
import Spinner from "../../components/Spinner/Spinner";
import InventoryRow from "./InventoryRow/InventoryRow";

const Inventory = () => {
  const { allProducts } = useSelector((state) => state.products);

  if (!allProducts) {
    return <Spinner />;
  }

  return (
    <section className={styles.wrapper}>
      <Breadcrumb title="inventory" />
      <div className={styles.content}>
        <h2>Inventory</h2>
        <div>
          <header className={styles.grid}>
            <span>Title</span>
            <span>Price</span>
            <span>Sale Price</span>
            <span>In Stock</span>
          </header>
          {allProducts.map((product) => {
            return <InventoryRow key={product.id} {...product} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default Inventory;
