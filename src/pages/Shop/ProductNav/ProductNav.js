import styles from "./ProductNav.module.scss";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearFilters, updateFilters } from "../../../features/productsSlice";
import Button from "../../../components/Button";

const ProductNav = () => {
  const { allCategories, filters } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  return (
    <nav>
      <div className={styles.sticky}>
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
            <label htmlFor="new">New</label>
          </div>
          <div className={styles["filter-row"]}>
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
            <label htmlFor="onSale">On sale</label>
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
