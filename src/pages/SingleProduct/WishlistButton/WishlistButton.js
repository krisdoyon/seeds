import Button from "../../../components/Button";
import styles from "./WishlistButton.module.scss";
import sharedStyles from "../SingleProduct.module.scss";

const WishlistButton = ({ disabled, handleWishlist, onWishlist }) => {
  let buttonText;
  if (onWishlist && !disabled) {
    buttonText = "Remove from Wishlist";
  } else if (!onWishlist && disabled) {
    buttonText = "Removed!";
  } else if (onWishlist && disabled) {
    buttonText = "Added!";
  } else {
    buttonText = "Add to Wishlist";
  }

  return (
    <Button
      fill
      className={`${styles.btn} ${disabled ? sharedStyles.disabled : ""}`}
      onClick={handleWishlist}
    >
      {buttonText}
    </Button>
  );
};

export default WishlistButton;
