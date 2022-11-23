import styles from "./PromoButton.module.scss";
import Button from "../../components/Button";
import { openModal } from "../../features/modalSlice";
import { useDispatch } from "react-redux";

const PromoButton = () => {
  const dispatch = useDispatch();
  return (
    <Button
      fill
      className={styles.btn}
      onClick={() => dispatch(openModal({ type: "promo" }))}
    >
      <p>Save</p>
      <p>10%!</p>
    </Button>
  );
};

export default PromoButton;
