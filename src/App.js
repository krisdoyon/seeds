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

function App() {
  const dispatch = useDispatch();
  const { cartItems, promo } = useSelector((state) => state.cart);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const { isModalOpen } = useSelector((state) => state.modal);

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

  return (
    <>
      {isModalOpen && <Modal />}

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
