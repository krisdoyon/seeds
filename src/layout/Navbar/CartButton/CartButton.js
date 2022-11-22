import { useState } from "react";
import styles from "./CartButton.module.scss";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BsCart3 } from "react-icons/bs";
import CartDropdown from "./CartDropdown";

const CartButton = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { amount } = useSelector((state) => state.cart);

  return (
    <div className={styles.wrapper}>
      {showDropdown && <CartDropdown setShowDropdown={setShowDropdown} />}
      <Link
        to="/cart"
        className={styles.btn}
        onMouseOver={() => setShowDropdown(true)}
        onMouseOut={() => setShowDropdown(false)}
      >
        <BsCart3 className={styles.icon} />
        <div className={styles.amount}>{amount}</div>
      </Link>
    </div>
  );
};

export default CartButton;
