import styles from "./AccountButton.module.scss";
import { FaRegUser } from "react-icons/fa";
import Button from "../../../components/Button";

const AccountButton = () => {
  return (
    <div className={styles.wrapper}>
      <Button to="/account" className={styles.btn}>
        <FaRegUser className={styles.icon} />
      </Button>
    </div>
  );
};

export default AccountButton;
