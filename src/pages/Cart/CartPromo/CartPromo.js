import { useState } from "react";
import styles from "./CartPromo.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { addPromo, removePromo } from "../../../features/cartSlice";
import { promoCodes } from "../../../assets/promo";
import { FaTag } from "react-icons/fa";
import Button from "../../../components/Button";

const CartPromo = () => {
  const { promo } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [promoInput, setPromoInput] = useState("");
  const handlePromo = (e) => {
    const promoMatch = promoCodes.find((item) => item.code === promoInput);
    setPromoInput("");
    if (promoMatch) {
      dispatch(addPromo({ ...promoMatch }));
    }
  };
  return (
    <div>
      <h3 className={styles.heading}>Promo code</h3>
      {promo.code !== null && (
        <div className={`${styles.promo} ${styles.applied}`}>
          <span>
            <FaTag />
            {`${promo.code} (${promo.percent * 100}% off)`}
          </span>
          <Button
            className={styles["btn-remove"]}
            onClick={() => dispatch(removePromo())}
          >
            Remove
          </Button>
        </div>
      )}
      {promo.code === null && (
        <div className={styles.promo}>
          <input
            type="text"
            value={promoInput}
            onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
          />
          <Button fill className={styles["btn-apply"]} onClick={handlePromo}>
            apply
          </Button>
        </div>
      )}
    </div>
  );
};

export default CartPromo;
