import Button from "../../../components/Button";
import styles from "./AddButton.module.scss";

const AddButton = ({ inStock, disabled, handleAdd }) => {
  return (
    <Button
      fill
      disabled={inStock === 0 || disabled}
      className={styles.btn}
      onClick={handleAdd}
    >
      {inStock === 0 ? "Sold Out" : disabled ? "Added!" : "Add to Cart"}
    </Button>
  );
};

export default AddButton;
