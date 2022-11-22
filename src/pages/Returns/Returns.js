import styles from "./Returns.module.scss";
import Breadcrumb from "../../components/Breadcrumb";

const Returns = () => {
  return (
    <section className={`container  ${styles.wrapper}`}>
      <Breadcrumb title="returns" />
      <div className={styles.policy}>
        <h2>Return & Refund Policy</h2>
        <p>
          We hope you are happy with your purchase. However, if you are not
          completely satisfied with your purchase for any reason, you may return
          it to us for a full refund, store credit, or an exchange. Please see
          below for more information on our return policy.
        </p>
        <h3>Returns</h3>
        <p>
          All returns must be postmarked within 30 days of the purchase date.
          All returned items must be in new and unused condition, with all
          original tags and labels attached.
        </p>
        <h3>Return Process</h3>
        <p>
          To return an item, please email customer service to obtain a Return
          Merchandise Authorization (RMA) number. After receiving a RMA number,
          place the item securely in its original packaging with your proof of
          purchase and mail your return to the following address:
        </p>
        <p className={styles.address}>
          <span>Harvest Seed Company</span>
          <span>ATTN: Returns</span>
          <span>3000 Harvest Way</span>
          <span>Hartford, CT 06101</span>
        </p>
        <p>
          Please note, you will be responsible for all return shipping charges.
          We strongly recommend that you use a trackable method to mail your
          return.
        </p>
        <h3>Refunds</h3>
        <p>
          After receiving your return and inspecting the condition of your item,
          we will process your return. Please allow at least 3 days from the
          receipt of your item to process your return. Refunds may take 1-2
          billing cycles to appear on your credit card statement, depending on
          your credit card company. We will notify you by email when your return
          has been processed.
        </p>
        <h3>Exceptions</h3>
        <p>
          For defective or damaged products, please contact us at the contact
          details below to arrange a refund or exchange. Sales on clearance
          items are final and these items cannot be returned.
        </p>
        <h3>Questions</h3>
        <p>
          If you have any questions concerning our return policy, please contact
          us at:
        </p>
        <span>(860) 245-3385</span>
        <span>contact@harvestseed.com</span>
      </div>
    </section>
  );
};

export default Returns;
