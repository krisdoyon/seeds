import CartItem from "./CartItem";
import cartReducer from "features/cartSlice";
import modalReducer from "features/modalSlice";
import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { renderWithProvider } from "utils/testUtils";
import { rest } from "msw";
import { setupServer } from "msw/node";

const server = setupServer(
  rest.get("*/products.json", (req, res, ctx) => {
    return res(ctx.json([]));
  }),
  rest.patch("*", jest.fn())
);

const reducer = {
  cart: cartReducer,
  modal: modalReducer,
};

let preloadedState;
let product;

beforeAll(() => {
  server.listen();
});

afterAll(() => {
  server.close();
});

beforeEach(() => {
  jest.useFakeTimers();
  product = {
    id: "BEAN1",
    title: "Kentucky Wonder",
    quantity: 1,
    salePrice: 299,
    price: 399,
    inStock: 10,
    imgURL: "/img/products/BEAN1.webp",
    linkURL: "/shop/beans/BEAN1",
    databaseId: "abc123",
  };

  preloadedState = {
    cart: { cartItems: [product] },
  };
});

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});

describe("<CartItem />", () => {
  it("should render the component without crashing", () => {
    renderWithProvider(<CartItem {...product} />, reducer);
    expect(screen.getByText("Kentucky Wonder")).toBeInTheDocument();
  });

  it("should show low stock text when less than 5 in stock", () => {
    product.inStock = 3;
    renderWithProvider(<CartItem {...product} />, reducer);
    expect(screen.getByText("Only 3 left!")).toBeInTheDocument();
  });

  it("should show on sale tag for products with a sale price", () => {
    renderWithProvider(<CartItem {...product} />, reducer);
    expect(screen.getByText(/on sale/i)).toBeInTheDocument();
  });

  it("should open confirm modal when remove button is clicked", async () => {
    const user = userEvent.setup({ delay: null });
    const { store } = renderWithProvider(<CartItem {...product} />, reducer);
    const removeButton = screen.getByRole("button", { name: "remove button" });
    await user.click(removeButton);
    const {
      modal: { isConfirmModalOpen, title, id },
    } = store.getState();
    expect(isConfirmModalOpen).toBe(true);
    expect(title).toBe("Kentucky Wonder");
    expect(id).toBe("abc123");
  });

  it("should increase quantity when up arrow is clicked", async () => {
    const user = userEvent.setup({ delay: null });
    const { store } = renderWithProvider(
      <CartItem {...product} />,
      reducer,
      preloadedState
    );
    const increaseButton = screen.getByRole("button", {
      name: "increase quantity for Kentucky Wonder",
    });
    await user.click(increaseButton);
  });

  it("should decrease quantity when down arrow is clicked", () => {});
});
