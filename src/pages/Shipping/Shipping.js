import React from "react";
import styled from "styled-components";
import Breadcrumb from "../../components/Breadcrumb";

const Wrapper = styled.div`
  max-width: 90rem;
  .shipping-policy {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    margin-top: 4rem;
  }
`;

const Shipping = () => {
  return (
    <Wrapper className="container">
      <Breadcrumb title={"Shipping"} />
      <div class="shipping-policy">
        <h2>Shipping Policy</h2>
        <p>
          All orders are processed within 2–3 business days of receipt. Orders
          are not processed or shipped from Friday, 12 pm EST through Sunday, or
          holidays. If we are experiencing a high volume of orders, shipments
          may be delayed by a few days. If your shipment experiences a
          significant delay, we will contact you via email or phone. Shipping
          rates and delivery estimates Shipping charges for your order will be
          calculated and displayed at checkout.
        </p>
        <h3>Rates</h3>
        <p>Under $50: $4.99</p>
        <p>Over $50: FREE!</p>
        <h3>P.O. boxes or APO/FPO addresses</h3>
        <p>
          We ship to addresses within the US, US Territories, and APO/FPO/DPO
          addresses.
        </p>
        <h3>Confirmation and Order Tracking</h3>
        <p>
          You will receive a Shipment Confirmation email with your tracking
          number once your order has shipped. The tracking number will be active
          within 24 hours.
        </p>
        <h3>Customs, Duties, and Taxes.</h3>
        We are not responsible for any customs and taxes applied to your order.
        All fees imposed during or after shipping are the customer’s
        responsibility (including tariffs, taxes, and other costs).
        <h3>Damages</h3>
        <p>
          We are not liable for any products damaged or lost during shipping. If
          you received your order damaged, please file a claim with the shipment
          carrier. Save all packaging materials and damaged goods before filing
          a claim.
        </p>
        <h3>International Shipping</h3>
        We currently do not ship outside the continental US.
        <h3>Incorrect Shipping Addresses and Refused Delivery</h3>
        <p>
          We make every attempt to validate the shipping address provided at
          checkout to ensure it’s recognized as a valid address by the USPS. If
          we cannot validate the address, we will try to contact the customer to
          provide an updated address. If we cannot update the address, the order
          will be canceled and refunded. We will not be held responsible if the
          customer provides the wrong shipping address and we cannot recover the
          package.
        </p>
        <h3>Missing or Stolen Shipments </h3>
        <p>
          If you didn’t receive your order, but the shipping carrier has
          reported that it was delivered, please let us know as soon as
          possible: Call [phone number] Or alert us at [email address] We will
          file a claim with the shipping carrier. Local law enforcement will be
          involved. We will replace or refund your order when the investigation
          is complete. Allow up to 21 days for the investigation.
        </p>
      </div>
    </Wrapper>
  );
};

export default Shipping;
