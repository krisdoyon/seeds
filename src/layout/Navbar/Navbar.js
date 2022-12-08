import styles from "./Navbar.module.scss";
import { Link, NavLink } from "react-router-dom";
import { navLinks } from "./navLinks";
import CartButton from "./CartButton";
import WishlistButton from "./WishlistButton/WishlistButton";
import AccountButton from "./AccountButton/AccountButton";
import { useSelector, useDispatch } from "react-redux";
import Button from "../../components/Button";
import { logout } from "../../features/authSlice";
import { resetForm } from "../../features/accountSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const { userId, isLoggedIn } = useSelector((state) => state.auth);
  const handleLogout = () => {
    dispatch(logout());
    dispatch(resetForm());
  };

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles["header-row"]}>
          <Link to="/" className={styles["logo-link"]}>
            <img src="/img/logo.png" alt="logo" className={styles.logo} />
          </Link>
          <div className={styles["btn-container"]}>
            {!isLoggedIn && (
              <Button to="/login" fill>
                Log in
              </Button>
            )}
            {isLoggedIn && (
              <Button fill onClick={handleLogout}>
                Log out
              </Button>
            )}
            {isLoggedIn && <AccountButton />}
            <WishlistButton />
            <CartButton />
          </div>
        </div>
        <ul className={styles.list}>
          {navLinks.map((link, i) => {
            return (
              <li key={i}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    isActive
                      ? `${styles.active} ${styles.link}`
                      : `${styles.link}`
                  }
                >
                  {link.text}
                </NavLink>
              </li>
            );
          })}
          {userId === process.env["REACT_APP_ADMIN_ID"] && (
            <li key={5}>
              <NavLink
                to="/inventory"
                className={({ isActive }) =>
                  isActive
                    ? `${styles.active} ${styles.link}`
                    : `${styles.link}`
                }
              >
                Inventory
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
