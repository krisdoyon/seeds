import styles from "./Account.module.scss";
import Breadcrumb from "../../components/Breadcrumb";
import { useSelector } from "react-redux";

const Account = () => {
  const { userId } = useSelector((state) => state.auth);
  return (
    <section>
      <Breadcrumb title="account" />
      <h2>Welcome back!</h2>
    </section>
  );
};

export default Account;
