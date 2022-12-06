import styles from "./InventoryRow.module.scss";
import sharedStyles from "../Inventory.module.scss";
import { useRef } from "react";
import Button from "../../../components/Button";
import { useDispatch } from "react-redux";
import { sendProductUpdates } from "../../../features/productsSlice";

const InventoryRow = ({ databaseId, title, price, salePrice, inStock }) => {
  const dispatch = useDispatch();
  const titleRef = useRef();
  const priceRef = useRef();
  const salePriceRef = useRef();
  const inStockRef = useRef();

  const handleUpdate = (e) => {
    e.preventDefault();
    const startingData = {
      title,
      price,
      salePrice,
      inStock,
    };
    const formData = Object.fromEntries(new FormData(e.target));
    const newData = {};
    for (const key in formData) {
      const newKey = key.replace(`${databaseId}-`, "");
      if (
        newKey === "price" ||
        newKey === "inStock" ||
        (newKey === "salePrice" && formData[key] !== "")
      ) {
        formData[key] = +formData[key];
      }
      if (newKey === "salePrice" && formData[key] === 0) {
        formData.salePrice = "";
      }
      if (formData[key] !== startingData[newKey])
        newData[newKey] = formData[key];
    }
    dispatch(sendProductUpdates([{ databaseId, newData }]));
  };

  return (
    <form className={sharedStyles.grid} onSubmit={handleUpdate}>
      <div className={styles["input-wrapper"]}>
        <input
          type="text"
          id={`${databaseId}-title`}
          name={`${databaseId}-title`}
          defaultValue={title}
          ref={titleRef}
        />
      </div>
      <div className={styles["input-wrapper"]}>
        <input
          type="text"
          id={`${databaseId}-price`}
          name={`${databaseId}-price`}
          defaultValue={price}
          ref={priceRef}
        />
      </div>
      <div className={styles["input-wrapper"]}>
        <input
          type="text"
          id={`${databaseId}-salePrice`}
          name={`${databaseId}-salePrice`}
          defaultValue={salePrice}
          ref={salePriceRef}
        />
      </div>
      <div className={styles["input-wrapper"]}>
        <input
          type="text"
          id={`${databaseId}-inStock`}
          name={`${databaseId}-inStock`}
          defaultValue={inStock}
          ref={inStockRef}
        />
      </div>
      <Button fill>Update</Button>
    </form>
  );
};

export default InventoryRow;
