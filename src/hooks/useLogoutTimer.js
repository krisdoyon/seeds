import { useEffect } from "react";
import { logout } from "../features/authSlice";
import { useDispatch, useSelector } from "react-redux";

export const useLogoutTimer = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, expirationTime } = useSelector((state) => state.auth);

  useEffect(() => {
    const timeRemaining = expirationTime - Date.now();
    const timeout = setTimeout(() => {
      if (isLoggedIn) {
        dispatch(logout());
      }
    }, timeRemaining);

    return () => clearTimeout(timeout);
  }, [isLoggedIn, expirationTime, dispatch]);
};
