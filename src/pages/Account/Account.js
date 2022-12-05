import styles from "./Account.module.scss";
import Breadcrumb from "../../components/Breadcrumb";
import { useSelector } from "react-redux";

const Account = () => {
  const { userId } = useSelector((state) => state.auth);
  return (
    <section>
      <Breadcrumb title="account" />
      <p>{`User ID: ${userId}`}</p>
    </section>
  );
};

export default Account;
