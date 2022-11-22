import styles from "./Navbar.module.scss";
import { Link, NavLink } from "react-router-dom";
import { navLinks } from "./navLinks";
import CartButton from "./CartButton";
import WishlistButton from "./WishlistButton/WishlistButton";

const Navbar = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link to="/">
          <img src="/img/logo.png" alt="logo" className={styles.logo} />
        </Link>
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
        <div className={styles["btn-container"]}>
          <WishlistButton />
          <CartButton />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
