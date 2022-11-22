import styles from "./Wishlist.module.scss";
import Breadcrumb from "../../components/Breadcrumb";
import ProductCard from "../../pages/Shop/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { removeWishlist } from "../../features/wishlistSlice";
import Button from "../../components/Button";

const Wishlist = () => {
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  return (
    <section className="container">
      <Breadcrumb title="wishlist" />
      <div className={styles.wrapper}>
        <h2 className={styles.heading}>Wishlist</h2>
        {wishlistItems.length === 0 && <p>Your wishlist is empty.</p>}
        {wishlistItems.length !== 0 && (
          <div className={styles.grid}>
            {wishlistItems.map((item) => {
              return (
                <article className={styles.item}>
                  <ProductCard key={item.id} {...item} />
                  <Button
                    fill
                    className={styles.btn}
                    onClick={() => dispatch(removeWishlist(item.id))}
                  >
                    Remove
                  </Button>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Wishlist;
