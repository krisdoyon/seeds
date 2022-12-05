import styles from "./Navbar.module.scss";
import { Link, NavLink } from "react-router-dom";
import { navLinks } from "./navLinks";
import CartButton from "./CartButton";
import WishlistButton from "./WishlistButton/WishlistButton";
import AccountButton from "./AccountButton/AccountButton";

const Navbar = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles["header-row"]}>
          <Link to="/" className={styles["logo-link"]}>
            <img src="/img/logo.png" alt="logo" className={styles.logo} />
          </Link>
          <div className={styles["btn-container"]}>
            <AccountButton />
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
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
