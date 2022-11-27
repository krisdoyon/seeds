import { useEffect } from "react";
// ROUTER
import { Routes, Route } from "react-router-dom";
// LAYOUT
import Layout from "./layout";
// MAIN PAGE COMPONENTS
import Home from "./pages/Home";
import About from "./pages/About";
import Cart from "./pages/Cart";
import SingleProduct from "./pages/SingleProduct";
import Shop from "./pages/Shop";
import Orders from "./pages/Orders";
import SingleOrder from "./pages/SingleOrder/SingleOrder";
import PageNotFound from "./pages/PageNotFound";
// FOOTER PAGE COMPONENTS
import { Shipping, Terms, Returns } from "./pages/Policies";
import FAQ from "./pages/FAQ";
// MODAL
import Modal from "./components/Modal/Modal";
// SASS
import "./assets/main.scss";

import { calculateTotals } from "./features/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import Wishlist from "./pages/Wishlist";

import { updateWishlistAmount } from "./features/wishlistSlice";
import Checkout from "./pages/Checkout/Checkout";
import Overlay from "./components/Overlay";
import { closeModal } from "./features/modalSlice";

function App() {
  const dispatch = useDispatch();
  const { cartItems, promo } = useSelector((state) => state.cart);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const { orders } = useSelector((state) => state.orders);
  const { isConfirmModalOpen, isPromoModalOpen } = useSelector(
    (state) => state.modal
  );
  const { products } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(calculateTotals());
  }, [dispatch, cartItems, promo]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    dispatch(updateWishlistAmount());
    localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
  }, [wishlistItems, dispatch]);

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
    // localStorage.setItem("products", JSON.stringify(products));
  }, [orders, products]);

  return (
    <>
      {(isConfirmModalOpen || isPromoModalOpen) && (
        <>
          <Overlay onClick={() => dispatch(closeModal())} />
          <Modal />
        </>
      )}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="shop">
            <Route index element={<Shop />} />
            <Route path=":category" element={<Shop />} />
          </Route>
          <Route path="/shop/:category/:id" element={<SingleProduct />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="orders" element={<Orders />} />
          <Route path="/orders/:id" element={<SingleOrder />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="terms" element={<Terms />} />
          <Route path="shipping" element={<Shipping />} />
          <Route path="return" element={<Returns />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
