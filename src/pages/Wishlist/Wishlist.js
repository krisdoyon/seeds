import styles from "./Wishlist.module.scss";
import Breadcrumb from "../../components/Breadcrumb";
import ProductCard from "../../pages/Shop/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../features/modalSlice";
import Button from "../../components/Button";

const Wishlist = () => {
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  return (
    <section className="container">
      <Breadcrumb title="wishlist" />
      <div className={styles.wrapper}>
        <h2 className={styles.heading}>Wishlist</h2>
        {wishlistItems.length === 0 && (
          <p className={styles.empty}>Your wishlist is empty.</p>
        )}
        {wishlistItems.length !== 0 && (
          <>
            <Button
              fill
              onClick={() =>
                dispatch(
                  openModal({
                    type: "confirm",
                    action: "clear",
                    page: "wishlist",
                  })
                )
              }
            >
              Clear wishlist
            </Button>
            <div className={styles.grid}>
              {wishlistItems.map((item) => {
                const { id, title } = item;
                return (
                  <ProductCard key={id} {...item}>
                    <Button
                      fill
                      className={styles.btn}
                      onClick={() =>
                        dispatch(
                          openModal({
                            type: "confirm",
                            action: "remove",
                            page: "wishlist",
                            id,
                            title,
                          })
                        )
                      }
                    >
                      Remove
                    </Button>
                  </ProductCard>
                );
              })}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Wishlist;
