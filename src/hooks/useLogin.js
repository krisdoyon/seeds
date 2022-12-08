import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "../features/accountSlice";
import { fetchOrders } from "../features/ordersSlice";

export const useLogin = () => {
  const dispatch = useDispatch();
  const { userId, token, isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchOrders());
      dispatch(fetchProfile({ userId, token }));
    }
  }, [isLoggedIn, dispatch, userId, token]);
};
