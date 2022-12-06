import { useEffect, lazy, Suspense } from "react";
// ROUTER
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./pages/ProtectedRoute";
// STATE
import { useSelector, useDispatch } from "react-redux";
// LAYOUT
import Layout from "./layout";
// SASS
import "./assets/main.scss";
// ACTIONS
import { calculateTotals, fetchCartItems } from "./features/cartSlice";
import { closeModal } from "./features/modalSlice";
import { fetchProducts } from "./features/productsSlice";
import { getTokenData } from "./features/authSlice";
import { fetchOrders } from "./features/ordersSlice";
// HOOKS
import { useLogoutTimer } from "./hooks/useLogoutTimer";
// SPINNER
import Spinner from "./components/Spinner";
// MAIN PAGE COMPONENTS
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Cart = lazy(() => import("./pages/Cart"));
const SingleProduct = lazy(() => import("./pages/SingleProduct"));
const Shop = lazy(() => import("./pages/Shop"));
const Orders = lazy(() => import("./pages/Orders"));
const SingleOrder = lazy(() => import("./pages/SingleOrder"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const Checkout = lazy(() => import("./pages/Checkout"));
const Wishlist = lazy(() => import("./pages/Wishlist"));
const Account = lazy(() => import("./pages/Account"));
const Login = lazy(() => import("./pages/Login"));
const Inventory = lazy(() => import("./pages/Inventory"));
// FOOTER PAGE COMPONENTS
const Shipping = lazy(() => import("./pages/Policies/Shipping"));
const Returns = lazy(() => import("./pages/Policies/Returns"));
const Terms = lazy(() => import("./pages/Policies/Terms"));
const FAQ = lazy(() => import("./pages/FAQ"));
// MODAL
const Modal = lazy(() => import("./components/Modal"));
const Overlay = lazy(() => import("./components/Overlay"));

const showSpinner = () => <Spinner />;

function App() {
  const dispatch = useDispatch();
  const { cartId, cartItems, promo } = useSelector((state) => state.cart);
  const { items: wishlistItems } = useSelector(
    (state) => state.products.wishlist
  );
  const { isConfirmModalOpen, isPromoModalOpen } = useSelector(
    (state) => state.modal
  );
  const { isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    if (cartId) dispatch(fetchCartItems(cartId));
  }, [cartId, dispatch]);

  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems, promo, dispatch]);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  useEffect(() => {
    dispatch(getTokenData());
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (isLoggedIn) dispatch(fetchOrders());
  }, [isLoggedIn, dispatch]);

  useLogoutTimer();

  return (
    <Layout>
      <Suspense fallback={showSpinner()}>
        {(isConfirmModalOpen || isPromoModalOpen) && (
          <>
            <Overlay onClick={() => dispatch(closeModal())} />
            <Modal />
          </>
        )}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/shop">
            <Route index element={<Shop />} />
            <Route path=":category" element={<Shop />} />
          </Route>
          <Route path="/shop/:category/:id" element={<SingleProduct />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/orders/:id" element={<SingleOrder />} />
          <Route path="/login" element={<Login />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          />
          <Route
            path="/inventory"
            element={
              <ProtectedRoute admin={true}>
                <Inventory />
              </ProtectedRoute>
            }
          />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/return" element={<Returns />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;
