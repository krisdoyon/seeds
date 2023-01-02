import { cleanup, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { renderWithProvider } from "utils/testUtils";
import productsReducer from "features/productsSlice";
import SingleProduct from "./SingleProduct";

const product = {
  id: "BEAN1",
  title: "Kentucky Wonder",
  category: "beans",
  price: 399,
  salePrice: "",
  description:
    'This 1800s variety is known for its exceptional flavor and tenderness. One of the oldest and most popular green beans on the market. The 9" pods are produced in clusters and are thick and stringless. Delicious fresh, frozen, or dried and shell beans. Early maturing and extremely productive.',
  inStock: 3,
  details: { isNew: false, seedCount: 100, daysToMaturity: 58 },
  reviews: { avg: 4, num: 36 },
  imgURL: "/img/products/BEAN1.webp",
  linkURL: "/shop/beans/BEAN1",
};

let preloadedState = {
  products: {
    allProducts: [product],
    currentProduct: {},
    notFound: false,
    wishlist: {
      items: [],
    },
  },
};

const reducer = {
  products: productsReducer,
};

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => {
    return {
      id: "BEAN1",
    };
  },
}));

afterEach(() => {
  cleanup();
});

describe("<SingleProduct />", () => {
  it("should render the component without crashing", () => {
    renderWithProvider(<SingleProduct />, reducer, preloadedState);
    const title = screen.getAllByText("Kentucky Wonder");
    expect(title.length > 0).toBe(true);
  });

  it("should correctly increase and decrease the quantity", async () => {
    const user = userEvent.setup();
    renderWithProvider(<SingleProduct />, reducer, preloadedState);
    const increaseButton = screen.getByRole("button", {
      name: "increase-quantity",
    });
    const decreaseButton = screen.getByRole("button", {
      name: "decrease-quantity",
    });
    expect(screen.getByText("1")).toBeInTheDocument();
    await user.click(increaseButton);
    expect(screen.getByText("2")).toBeInTheDocument();
    await user.click(increaseButton);
    expect(screen.getByText("3")).toBeInTheDocument();
    await user.click(increaseButton);
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.queryByText("4")).not.toBeInTheDocument();
    await user.click(decreaseButton);
    expect(screen.getByText("2")).toBeInTheDocument();
    await user.click(decreaseButton);
    expect(screen.getByText("1")).toBeInTheDocument();
    await user.click(decreaseButton);
    expect(screen.queryByText("0")).not.toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("should show the correct wishlist button text", async () => {
    const user = userEvent.setup();
    renderWithProvider(<SingleProduct />, reducer, preloadedState);

    const add = screen.getByRole("button", {
      name: "Add to Wishlist",
    });
    expect(add).toBeInTheDocument();
    await user.click(add);
    const added = screen.getByRole("button", {
      name: "Added!",
    });
    expect(added).toBeInTheDocument();
    const remove = await screen.findByRole(
      "button",
      {
        name: "Remove from Wishlist",
      },
      { timeout: 2000 }
    );
    expect(remove).toBeInTheDocument();
  });

  it("should add the product to the wishlist", async () => {
    const user = userEvent.setup();
    const { store } = renderWithProvider(
      <SingleProduct />,
      reducer,
      preloadedState
    );
    const add = screen.getByRole("button", {
      name: "Add to Wishlist",
    });
    expect(add).toBeInTheDocument();
    await user.click(add);
    const {
      products: {
        wishlist: { items },
      },
    } = store.getState();
    expect(items.some((item) => item.id === "BEAN1")).toBe(true);
  });

  it("should remove the product from the wishlist", async () => {
    const user = userEvent.setup();
    const newPreloadedState = {
      products: { ...preloadedState.products, wishlist: { items: [product] } },
    };
    const { store } = renderWithProvider(
      <SingleProduct />,
      reducer,
      newPreloadedState
    );
    const {
      products: {
        wishlist: { items },
      },
    } = store.getState();
    expect(items.some((item) => item.id === "BEAN1")).toBe(true);
    const remove = screen.getByRole("button", { name: "Remove from Wishlist" });
    await user.click(remove);
    const {
      products: {
        wishlist: { items: newItems },
      },
    } = store.getState();
    expect(newItems.some((item) => item.id === "BEAN1")).toBe(false);
  });
});
