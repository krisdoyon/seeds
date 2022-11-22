import Button from "../../../components/Button";
import styles from "./AddButton.module.scss";
import sharedStyles from "../SingleProduct.module.scss";

const AddButton = ({ inStock, disabled, handleAdd }) => {
  return (
    <Button
      fill
      className={`${styles.btn} ${
        inStock === 0 || disabled ? sharedStyles.disabled : ""
      }`}
      onClick={handleAdd}
    >
      {inStock === 0 ? "Sold Out" : disabled ? "Added!" : "Add to Cart"}
    </Button>
  );
};

export default AddButton;
