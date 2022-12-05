import styles from "./Spinner.module.scss";
import { ImSpinner3 } from "react-icons/im";

const Spinner = ({ className }) => {
  return (
    <div className={`${styles.wrapper} ${className ? className : ""}`}>
      <ImSpinner3 className={styles.icon} />
    </div>
  );
};

export default Spinner;
