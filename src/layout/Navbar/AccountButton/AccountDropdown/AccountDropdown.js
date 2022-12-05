import styles from "./AccountDropdown.module.scss";
import DropdownMenu from "../../../../components/DropdownMenu";
import Button from "../../../../components/Button";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../../features/authSlice";

const AccountDropdown = ({ setShowDropdown }) => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <DropdownMenu setShowDropdown={setShowDropdown} className={styles.dropdown}>
      {!isLoggedIn && (
        <Button to="/login" className={styles["btn-login"]} fill>
          Login
        </Button>
      )}
      {isLoggedIn && (
        <Button
          className={styles["btn-login"]}
          onClick={() => {
            dispatch(logout());
          }}
          fill
        >
          Logout
        </Button>
      )}
    </DropdownMenu>
  );
};

export default AccountDropdown;
