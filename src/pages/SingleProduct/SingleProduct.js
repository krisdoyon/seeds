import { useEffect, useState } from "react";
import styles from "./SingleProduct.module.scss";
import { useDispatch, useSelector } from "react-redux";
// ROUTER
import { useParams, useNavigate } from "react-router-dom";
// STATE
import { loadSingleProduct } from "../../features/productsSlice";
import { addWishlist, removeWishlist } from "../../features/wishlistSlice";
// UTIL
import { formatPrice } from "../../utils/formatPrice";
// COMPONENTS
import Breadcrumb from "../../components/Breadcrumb";
import { addItem } from "../../features/cartSlice";
import { OnSaleTag, NewTag } from "../../components/Tags";
import WishlistButton from "./WishlistButton";
import AddButton from "./AddButton";
import PageNotFound from "../PageNotFound";
import QuantityBtns from "../../components/QuantityBtns";
import Button from "../../components/Button";

const SingleProduct = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [cartDisabled, setCartDisabled] = useState(false);
  const [wishlistDisabled, setWishlistDisabled] = useState(false);

  useEffect(() => {
    dispatch(loadSingleProduct(id));
  }, [dispatch, id]);

  const { currentProduct, error } = useSelector((state) => state.products);
  const { wishlistItems } = useSelector((state) => state.wishlist);

  if (error) {
    return <PageNotFound />;
  }

  if (currentProduct.id) {
    const {
      title,
      category,
      description,
      price,
      salePrice,
      inStock,
      reviews: { avg, num },
      details: { daysToMaturity, seedCount, isNew },
    } = currentProduct;

    const handleAdd = () => {
      const item = {
        id,
        title,
        quantity,
        price: salePrice || price,
        salePrice,
        inStock,
        category,
      };
      dispatch(addItem(item));
      setCartDisabled(true);
      setTimeout(() => setCartDisabled(false), 2000);
    };

    const onWishlist = wishlistItems.find((item) => item.id === id);

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
      <section className={`container ${styles.wrapper}`}>
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
            <img src={`/img/${id}.webp`} alt={title} />
            {isNew && <NewTag className={styles["new-tag"]} />}
          </div>
          <div className={styles.info}>
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.description}>{description}</p>
            <div className={styles.details}>
              <div className={styles.prices}>
                <strong>Price:</strong>
                <p className={`${salePrice ? styles.strike : ""}`}>
                  {formatPrice(price)}
                </p>
                {salePrice && <p>{formatPrice(salePrice)}</p>}
                {salePrice && <OnSaleTag />}
              </div>
              <p>
                <strong>Rating: </strong>
                {avg} ({num} reviews)
              </p>
              <p>
                <strong>Days to Maturity: </strong>
                {daysToMaturity}
              </p>
              <p>
                <strong>Seed Count: </strong>
                {seedCount}
              </p>
              <p>
                <strong>Availability: </strong>
                {inStock === 0 && "Sold Out"}
                {inStock > 5 && `${inStock} in stock`}
                {inStock <= 5 && inStock > 1 && (
                  <span
                    className={styles["low-stock"]}
                  >{`Only ${inStock} left in stock!`}</span>
                )}
              </p>
            </div>
            {inStock !== 0 && (
              <QuantityBtns
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
