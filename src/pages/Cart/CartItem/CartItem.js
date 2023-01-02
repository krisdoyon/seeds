import styles from "./CartItem.module.scss";
import sharedStyles from "../Cart.module.scss";
import { useDispatch } from "react-redux";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { formatPrice } from "../../../utils/formatPrice";
import { useToggle } from "../../../hooks/useToggle";
import { Link } from "react-router-dom";
import { OnSaleTag } from "../../../components/Tags/Tags";
import Button from "../../../components/Button";
import { openModal } from "../../../features/modalSlice";

const CartItem = ({
  id,
  title,
  quantity,
  salePrice,
  price,
  inStock,
  imgURL,
  linkURL,
  databaseId,
}) => {
  const dispatch = useDispatch();
  const handleToggle = useToggle(databaseId, id);

  return (
    <article className={`${styles.item} ${sharedStyles.grid}`}>
      <div className={styles["title-wrapper"]}>
        <img className={styles.img} src={imgURL} alt={title} />
        <div className={styles["title-info-wrapper"]}>
          <Link to={linkURL} className={styles.title}>
            {title}
          </Link>
          {inStock > 5 && (
            <p className={styles["in-stock"]}>{`${inStock} available`}</p>
          )}
          {inStock <= 5 && (
            <p
              className={`${styles["in-stock"]} ${styles["low-stock"]}`}
            >{`Only ${inStock} left!`}</p>
          )}
        </div>
      </div>
      <div className={styles["price-wrapper"]}>
        <p className={styles.price}>{`${formatPrice(
          salePrice || price
        )} each`}</p>
        {salePrice && <OnSaleTag />}
      </div>
      <div className={styles["toggle-wrapper"]}>
        <Button
          className={styles["btn-toggle"]}
          onClick={() => handleToggle("increase")}
          aria-label={`increase quantity for ${title}`}
        >
          <FaChevronUp className={styles["toggle-icon"]} />
        </Button>
        <p className={styles.quantity}>{quantity}</p>
        <Button
          className={styles["btn-toggle"]}
          onClick={() => handleToggle("decrease")}
          aria-label={`decrease quantity for ${title}`}
        >
          <FaChevronDown className={styles["toggle-icon"]} />
        </Button>
      </div>

      <p className={styles.subtotal}>
        {formatPrice((salePrice || price) * quantity)}
      </p>

      <Button
        className={styles["btn-remove"]}
        onClick={() =>
          dispatch(
            openModal({
              type: "confirm",
              action: "remove",
              page: "cart",
              id: databaseId,
              title,
            })
          )
        }
        fill
        aria-label="remove button"
      >
        X
      </Button>
    </article>
  );
};

export default CartItem;
