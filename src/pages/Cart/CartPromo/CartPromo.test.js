import { renderWithProvider } from "utils/testUtils";
import CartPromo from "./CartPromo";
import cartReducer from "features/cartSlice";
import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

const reducer = {
  cart: cartReducer,
};

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

let preloadedState;

const promoText = "save10 (10% off)";

beforeEach(() => {
  preloadedState = {
    cart: {
      promo: noPromoCode,
      subtotal: 100,
    },
  };
});

describe("<CartPromo />", () => {
  it("should render the component without crashing", () => {
    renderWithProvider(<CartPromo />, reducer, preloadedState);
    const heading = screen.getByText("Promo code");
    expect(heading).toBeInTheDocument();
  });

  it("should render the apply button with no active promo code", () => {
    renderWithProvider(<CartPromo />, reducer, preloadedState);
    const applyButton = screen.getByRole("button", {
      name: /Apply/i,
    });
    expect(applyButton).toBeInTheDocument();
  });

  it("should render promo code text and remove button with an active promo code", () => {
    preloadedState = {
      cart: {
        promo: promoCode,
      },
    };
    renderWithProvider(<CartPromo />, reducer, preloadedState);
    const text = screen.getByText(promoText, { exact: false });
    expect(text).toBeInTheDocument();
  });

  it("should update promo code in state and UI when applied", async () => {
    const user = userEvent.setup();
    const { store } = renderWithProvider(
      <CartPromo />,
      reducer,
      preloadedState
    );
    const input = screen.getByRole("textbox", { name: "promo input" });
    const applyButton = screen.getByRole("button", {
      name: /Apply/i,
    });
    await user.type(input, "save10");
    await user.click(applyButton);
    const text = screen.getByText(promoText, { exact: false });

    const {
      cart: {
        promo: { code, amount, percent, minimum },
      },
    } = store.getState();

    expect(text).toBeInTheDocument();
    expect(code).toBe("SAVE10");
    expect(amount).toBe(10);
    expect(percent).toBe(0.1);
    expect(minimum).toBe(0);
  });
});
