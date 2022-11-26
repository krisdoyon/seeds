import Button from "../../../components/Button";
import styles from "./WishlistButton.module.scss";

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
      disabled={disabled}
      className={styles.btn}
      onClick={handleWishlist}
    >
      {buttonText}
    </Button>
  );
};

export default WishlistButton;
