import styles from "./ProductCard.module.scss";
import { Link } from "react-router-dom";
import { formatPrice } from "../../../utils/formatPrice";
import {
  OnSaleTag,
  LowStockTag,
  SoldOutTag,
  NewTag,
} from "../../../components/Tags/Tags";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";

const ProductCard = ({
  id,
  title,
  category,
  price,
  salePrice,
  inStock,
  reviews: { num, avg },
  details: { isNew },
}) => {
  return (
    <article className={styles.card}>
      <Link to={`/shop/${category}/${id}`}>
        <div className={styles["img-container"]}>
          <img src={`/img/${id}.webp`} alt="" />
          {isNew && <NewTag />}
          <div className={styles.tags}>
            {inStock === 0 && <SoldOutTag />}
            {inStock <= 5 && inStock >= 1 && <LowStockTag />}
          </div>
          <HiOutlineMagnifyingGlass className={styles["magnify-icon"]} />
        </div>
        <div className={styles.info}>
          <h2 className={styles.title}>{title}</h2>
          <div className={styles.prices}>
            <p className={`${salePrice ? styles.strike : ""}`}>
              {formatPrice(price)}
            </p>
            {salePrice && <p>{formatPrice(salePrice)}</p>}
            {salePrice && <OnSaleTag />}
          </div>
          <p>
            {avg} stars ({num} reviews)
          </p>
        </div>
      </Link>
    </article>
  );
};

export default ProductCard;
