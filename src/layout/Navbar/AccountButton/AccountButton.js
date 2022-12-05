import styles from "./AccountButton.module.scss";
import { FaRegUser } from "react-icons/fa";
import Button from "../../../components/Button";
import { useState } from "react";
import AccountDropdown from "./AccountDropdown";
import { useSelector } from "react-redux";

const AccountButton = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.auth);

  return (
    <div className={styles.wrapper}>
      {showDropdown && <AccountDropdown setShowDropdown={setShowDropdown} />}
      <Button
        to={isLoggedIn ? "/account" : "/login"}
        className={styles.btn}
        onMouseOver={() => setShowDropdown(true)}
        onMouseOut={() => setShowDropdown(false)}
      >
        <FaRegUser className={styles.icon} />
      </Button>
    </div>
  );
};

export default AccountButton;
