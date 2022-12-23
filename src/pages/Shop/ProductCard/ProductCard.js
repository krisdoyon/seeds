import styles from "./ProductCard.module.scss";
import { Link } from "react-router-dom";
import { formatPrice } from "../../../utils/formatPrice";
import {
  OnSaleTag,
  LowStockTag,
  SoldOutTag,
  NewTag,
} from "../../../components/Tags/Tags";
import { FaSearch } from "react-icons/fa";
import Stars from "../../../components/Stars";

const ProductCard = ({
  id,
  title,
  category,
  price,
  salePrice,
  inStock,
  reviews: { num, avg },
  details: { isNew },
  imgURL,
  linkURL,
  children,
}) => {
  return (
    <article className={styles.card}>
      <Link to={linkURL} data-testid={"product-card-link"}>
        <div className={styles["img-container"]}>
          <img src={imgURL} alt="" />
          {isNew && <NewTag />}
          <div className={styles.tags}>
            {inStock === 0 && <SoldOutTag />}
            {inStock <= 5 && inStock >= 1 && <LowStockTag />}
          </div>
          <FaSearch
            className={styles["magnify-icon"]}
            data-testid="magnify-icon"
          />
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
          <Stars num={num} avg={avg} />
        </div>
      </Link>
      {children}
    </article>
  );
};

export default ProductCard;
