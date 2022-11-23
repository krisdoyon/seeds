import styles from "./ProductNav.module.scss";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearFilters, updateFilters } from "../../../features/productsSlice";
import Button from "../../../components/Button";
import { FaSearch } from "react-icons/fa";

const ProductNav = () => {
  const { allCategories, filters } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const { search } = useSelector((state) => state.products.filters);

  return (
    <nav>
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
            onChange={(e) =>
              dispatch(
                updateFilters({ filter: "search", value: e.target.value })
              )
            }
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
          <div className={styles["filter-row"]}>
            <label htmlFor="new" className={styles.container}>
              New
              <input
                id="new"
                name="new"
                type="checkbox"
                checked={filters.new}
                onChange={(e) =>
                  dispatch(
                    updateFilters({
                      filter: e.target.name,
                      value: e.target.checked,
                    })
                  )
                }
              />
              <span className={styles.checkmark}></span>
            </label>
          </div>
          <div className={styles["filter-row"]}>
            <label htmlFor="onSale" className={styles.container}>
              On sale
              <input
                id="onSale"
                name="onSale"
                type="checkbox"
                checked={filters.onSale}
                onChange={(e) =>
                  dispatch(
                    updateFilters({
                      filter: e.target.name,
                      value: e.target.checked,
                    })
                  )
                }
              />
              <span className={styles.checkmark}></span>
            </label>
          </div>
          <Button
            fill
            className={styles["btn-clear"]}
            onClick={() => dispatch(clearFilters())}
          >
            Clear Filters
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default ProductNav;
