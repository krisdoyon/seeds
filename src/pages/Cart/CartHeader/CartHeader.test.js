import { renderWithProvider } from "utils/testUtils";
import CartHeader from "./CartHeader";
import cartReducer from "features/cartSlice";
import { cleanup, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

const subtotal = 300;
const amount = 3;

let preloadedState = {
  cart: {
    subtotal,
    shippingCost: 499,
    amount,
  },
};

const reducer = {
  cart: cartReducer,
};

afterEach(() => {
  cleanup();
});

describe("<CartHeader />", () => {
  it("should render the component without crashing", () => {
    renderWithProvider(<CartHeader />, reducer, preloadedState);
    const title = screen.getByText("Your Cart");
    expect(title).toBeInTheDocument();
  });

  it("should render the shipping message with the correct additional amount to qualify", () => {
    renderWithProvider(<CartHeader />, reducer, preloadedState);
    const message = screen.getByText("Add", { exact: false });
    expect(message).toHaveTextContent(
      "Add $47.00 more to qualify for free shipping!"
    );
  });

  it("should render the free shipping message when minimum is met", () => {
    preloadedState = {
      cart: {
        subtotal: 5001,
        shippingCost: 0,
        amount,
      },
    };
    renderWithProvider(<CartHeader />, reducer, preloadedState);
    const message = screen.getByText("Your order qualifies", { exact: false });
    expect(message).toHaveTextContent(
      "Your order qualifies for FREE SHIPPING!"
    );
  });
});
