import { useRef } from "react";
import { useDispatch } from "react-redux";
import { toggleAmount } from "../features/cartSlice";
import { sendQuantityUpdate } from "../features/cartSlice";

export const useToggle = (databaseId, id) => {
  const timerRef = useRef(null);
  const dispatch = useDispatch();

  const handleToggle = (action) => {
    clearTimeout(timerRef.current);
    dispatch(toggleAmount({ action, id }));
    timerRef.current = setTimeout(() => {
      dispatch(sendQuantityUpdate({ databaseId }));
    }, 2000);
  };

  return handleToggle;
};
