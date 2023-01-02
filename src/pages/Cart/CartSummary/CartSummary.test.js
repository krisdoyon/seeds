import CartSummary from "./CartSummary";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

const noPromoCode = {
  code: null,
  percent: 0,
  minimum: null,
  amount: 0,
};

const promoCode = {
  code: "SAVE10",
  percent: 0.1,
  minimum: 0,
  amount: 100,
};

let props;

beforeEach(() => {
  props = {
    subtotal: 199,
    tax: 199 * 0.0635,
    shippingCost: 499,
    total: 711,
    amount: 1,
    promo: noPromoCode,
  };
});

describe("<CartSummary />", () => {
  it("should render the component without crashing", () => {
    render(<CartSummary {...props} />);
    expect(screen.getByText(/order summary/i)).toBeInTheDocument();
  });

  it("should render promo code when passed in", () => {
    props.promo = promoCode;
    render(<CartSummary {...props} />);
    expect(screen.getByText("- $1.00")).toBeInTheDocument();
    expect(screen.getByText(/promo:/i)).toBeInTheDocument();
  });

  it("should render the correct item text (singular)", () => {
    render(<CartSummary {...props} />);
    expect(screen.getByText("1 item")).toBeInTheDocument();
  });

  it("should render the correct item text (plural)", () => {
    props.amount = 2;
    render(<CartSummary {...props} />);
    expect(screen.getByText("2 items")).toBeInTheDocument();
  });

  it("should show shipping as free if passed zero shipping cost", () => {
    props.shippingCost = 0;
    render(<CartSummary {...props} />);
    expect(screen.getByText(/free!/i)).toBeInTheDocument();
  });
});
