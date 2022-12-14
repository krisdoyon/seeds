import { useEffect, useState } from "react";
import styles from "./SingleProduct.module.scss";
import { useDispatch, useSelector } from "react-redux";
// ROUTER
import { useParams, useNavigate } from "react-router-dom";
// STATE
import {
  loadSingleProduct,
  addWishlist,
  removeWishlist,
} from "../../features/productsSlice";
import { addCartItem } from "../../features/cartSlice";
// UTIL
import { formatPrice } from "../../utils/formatPrice";
// COMPONENTS
import Breadcrumb from "../../components/Breadcrumb";
import { OnSaleTag, NewTag } from "../../components/Tags";
import WishlistButton from "./WishlistButton";
import AddButton from "./AddButton";
import PageNotFound from "../PageNotFound";
import QuantityBtns from "../../components/QuantityBtns";
import Button from "../../components/Button";
import Stars from "../../components/Stars";

const SingleProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [cartDisabled, setCartDisabled] = useState(false);
  const [wishlistDisabled, setWishlistDisabled] = useState(false);
  const { items: wishlistItems } = useSelector(
    (state) => state.products.wishlist
  );
  const onWishlist = wishlistItems.some((item) => item.id === id);

  const { currentProduct, notFound, isLoading } = useSelector(
    (state) => state.products
  );
  useEffect(() => {
    if (isLoading) return;
    dispatch(loadSingleProduct(id));
  }, [dispatch, id, isLoading]);

  if (notFound) {
    return <PageNotFound />;
  }

  if (currentProduct.id) {
    const {
      databaseId,
      title,
      category,
      description,
      price,
      salePrice,
      inStock,
      reviews: { avg, num },
      details: { daysToMaturity, seedCount, isNew },
      imgURL,
    } = currentProduct;

    const handleAdd = () => {
      dispatch(addCartItem({ databaseId, quantity }));
      setCartDisabled(true);
      setTimeout(() => setCartDisabled(false), 2000);
    };

    const handleWishlist = () => {
      setWishlistDisabled(true);
      setTimeout(() => setWishlistDisabled(false), 2000);
      if (onWishlist) {
        dispatch(removeWishlist(id));
      } else {
        dispatch(addWishlist(id));
      }
    };

    const handleIncrease = () => {
      if (quantity < inStock) {
        setQuantity(quantity + 1);
      }
    };

    const handleDecrease = () => {
      if (quantity > 1) {
        setQuantity(quantity - 1);
      }
    };

    return (
      <section className={styles.wrapper}>
        <header>
          <Button
            fill
            className={styles["btn-back"]}
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
          <Breadcrumb title={title} category={category} product />
        </header>
        <div className={styles.grid}>
          <div className={styles["img-container"]}>
            <img src={imgURL} alt={title} />
            {isNew && <NewTag className={styles["new-tag"]} />}
          </div>
          <div className={styles.info}>
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.description}>{description}</p>
            <div className={styles.details}>
              <div className={styles.row}>
                <strong>Price:</strong>
                <p className={`${salePrice ? styles.strike : ""}`}>
                  {formatPrice(price)}
                </p>
                {salePrice && <p>{formatPrice(salePrice)}</p>}
                {salePrice && <OnSaleTag />}
              </div>
              <div className={styles.row}>
                <strong>Rating: </strong>
                <Stars num={num} avg={avg} />
              </div>
              <div className={styles.row}>
                <strong>Days to Maturity: </strong>
                {daysToMaturity}
              </div>
              <div className={styles.row}>
                <strong>Seed Count: </strong>
                {seedCount}
              </div>
              <div className={styles.row}>
                <strong>Availability: </strong>
                {inStock === 0 && "Sold Out"}
                {inStock > 5 && `${inStock} in stock`}
                {inStock <= 5 && inStock >= 1 && (
                  <span
                    className={styles["low-stock"]}
                  >{`Only ${inStock} left in stock!`}</span>
                )}
              </div>
            </div>
            {inStock !== 0 && (
              <QuantityBtns
                className={styles["qty-btns"]}
                quantity={quantity}
                handleIncrease={handleIncrease}
                handleDecrease={handleDecrease}
              />
            )}
            <div className={styles["button-container"]}>
              <AddButton
                inStock={inStock}
                disabled={cartDisabled}
                handleAdd={handleAdd}
              />
              <WishlistButton
                onWishlist={onWishlist}
                disabled={wishlistDisabled}
                handleWishlist={handleWishlist}
              />
            </div>
          </div>
        </div>
      </section>
    );
  }
};

export default SingleProduct;
