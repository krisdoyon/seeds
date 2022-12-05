import styles from "./CartPreviewItem.module.scss";
import buttons from "../../../../components/Button/Button.module.scss";
import { Link } from "react-router-dom";
// STATE
import { useDispatch } from "react-redux";
import { openModal } from "../../../../features/modalSlice";
import { useToggle } from "../../../../hooks/useToggle";
// COMPONENTS
import QuantityBtns from "../../../../components/QuantityBtns";
import { OnSaleTag } from "../../../../components/Tags";
import { formatPrice } from "../../../../utils/formatPrice";

const CartPreviewItem = ({
  id,
  title,
  category,
  quantity,
  price,
  salePrice,
  inStock,
  imgURL,
  linkURL,
  databaseId,
}) => {
  const dispatch = useDispatch();
  const handleToggle = useToggle(databaseId, id);

  return (
    <article className={styles.item}>
      <img className={styles.img} src={imgURL} alt={title} />
      <header className={styles.header}>
        <Link to={linkURL} className={styles.title}>
          {title}
        </Link>
        {salePrice && <OnSaleTag className={styles.tag} />}
      </header>

      <div className={styles.content}>
        <div className={styles.info}>
          <p>{formatPrice(salePrice || price)} / ea.</p>
          <button
            className={`${buttons.btn} ${styles["btn-remove"]}`}
            onClick={() =>
              dispatch(
                openModal({
                  type: "confirm",
                  action: "remove",
                  page: "cart",
                  title,
                  id: databaseId,
                })
              )
            }
          >
            Remove
          </button>
        </div>
        <QuantityBtns
          className={styles["qty-btns"]}
          quantity={quantity}
          inStock={inStock}
          handleIncrease={() => handleToggle("increase")}
          handleDecrease={() => handleToggle("decrease")}
          small
        />
      </div>
    </article>
  );
};

export default CartPreviewItem;
