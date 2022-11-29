import styles from "./ProductNav.module.scss";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearFilters, updateFilters } from "../../../features/productsSlice";
import Button from "../../../components/Button";
import { FaSearch } from "react-icons/fa";
import Checkbox from "../../../components/Checkbox";

const ProductNav = ({ isNavOpen, setIsNavOpen }) => {
  const { allCategories, filters } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const { search } = useSelector((state) => state.products.filters);

  const setFilter = (e) => {
    let value;
    if (e.target.id === "search") {
      value = e.target.value;
    } else {
      value = e.target.checked;
    }
    dispatch(
      updateFilters({
        filter: e.target.id,
        value,
      })
    );
  };

  return (
    <nav className={`${styles.wrapper} ${isNavOpen ? styles["nav-open"] : ""}`}>
      <Button
        className={styles["btn-close"]}
        onClick={() => setIsNavOpen(false)}
      >
        &times;
      </Button>
      <div className={styles.sticky}>
        <label htmlFor="search" className={styles.heading}>
          Search
        </label>
        <div className={styles["search-wrapper"]}>
          <input
            className={styles.search}
            type="text"
            name="search"
            id="search"
            placeholder="Enter search term..."
            value={search}
            onChange={setFilter}
          />
          <FaSearch className={styles["magnify-icon"]} />
        </div>
        <h2 className={styles.heading}>Shop by Category</h2>
        <div className={styles.list}>
          <NavLink
            to="/shop"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : `${styles.link}`
            }
            end
          >
            All
          </NavLink>
          {allCategories.map((category, i) => {
            return (
              <div key={i}>
                <NavLink
                  to={`/shop/${category}`}
                  className={({ isActive }) =>
                    isActive
                      ? `${styles.link} ${styles.active}`
                      : `${styles.link}`
                  }
                >
                  {category}
                </NavLink>
                <br />
              </div>
            );
          })}
        </div>
        <h2 className={styles.heading}>Filter</h2>
        <div className={styles.list}>
          <Checkbox
            label="New"
            id="new"
            checked={filters.new}
            onChange={setFilter}
          />
          <Checkbox
            label="On sale"
            id="onSale"
            checked={filters.onSale}
            onChange={setFilter}
          />
          <Checkbox
            label="In stock"
            id="inStock"
            checked={filters.inStock}
            onChange={setFilter}
          />
        </div>
        <Button
          fill
          className={styles["btn-clear"]}
          onClick={() => dispatch(clearFilters())}
        >
          Clear Filters
        </Button>
      </div>
    </nav>
  );
};

export default ProductNav;
