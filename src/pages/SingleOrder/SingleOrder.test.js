import { cleanup, render, screen } from "@testing-library/react";
import SingleOrder from "./SingleOrder";
import { BrowserRouter as Router, useParams } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import ordersReducer from "features/ordersSlice";
import modalReducer from "features/modalSlice";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

const orderNumber = "1";
const databaseId = "2";

const preloadedState = {
  orders: {
    orders: [
      {
        amount: 15,
        billing: {
          address1: "25 Redwood St.",
          address2: "",
          city: "Portland",
          first: "John",
          last: "Smith",
          state: "ME",
          zip: "04101",
        },
        date: 1670464216616,
        databaseId,
        displayDate: "December 07, 2022",
        orderNumber,
        payment: {
          card: {
            code: "159",
            expMonth: "01",
            expYear: "2023",
            name: "John Smith",
            number: "4496 1600 0032 4588",
          },
          promo: {
            amount: 508.5,
            code: "SAVE10",
            minimum: 0,
            percent: 0.1,
          },
          shippingCost: 0,
          subtotal: 5085,
          tax: 290.60775,
          total: 4867.10775,
        },
        products: [
          {
            category: "herbs",
            databaseId: "-NIP7NRiX66y23b7Ilho",
            description:
              "A key herb in any Italian, Greek, or Mexican cooking. This attractive shrub-like perennial grows flavorful leaves perfect for using fresh or dried. Divide out clumps and plant around the garden for natural pest control or give to friends and family. Attracts honeybees and beneficial pollinators to the garden when it flowers.",
            details: {
              daysToMaturity: 60,
              isNew: false,
              seedCount: 300,
            },
            id: "HERB4",
            imgURL: "/img/products/HERB4.webp",
            inStock: 10,
            linkURL: "/shop/herbs/HERB4",
            price: 399,
            quantity: 6,
            reviews: {
              avg: 4.5,
              num: 68,
            },
            salePrice: "",
            title: "Oregano",
          },
          {
            category: "peppers",
            databaseId: "-NIP7NS90wncLaLbIUt6",
            description:
              "This variety has been the most popular bell variety since its introduction in 1928. A standard go-to bell pepper for decades. The perfect blocky, four-lobed stuffing pepper. Thick-walled and bursting with flavor. The largest open-pollinated heirloom bell pepper on the market!",
            details: {
              daysToMaturity: 75,
              isNew: false,
              seedCount: 50,
            },
            id: "PEP1",
            imgURL: "/img/products/PEP1.webp",
            inStock: 80,
            linkURL: "/shop/peppers/PEP1",
            price: 299,
            quantity: 5,
            reviews: {
              avg: 5,
              num: 110,
            },
            salePrice: "",
            title: "California Wonder",
          },
          {
            category: "radishes",
            databaseId: "-NIP7NSRWQb96lHaSxGZ",
            description:
              "The French Breakfast Radish is a blunt finger-shaped radish growing to about 3″ long. The roots are red blending to white at the tip. The flesh is crisp and white with a little kick. The short shelf life makes this variety perfect for the home gardener. Plant French Breakfast Radish Seeds very early in the spring in a sunny location as soon as the ground may be cultivated and enriched with organic material. For an extended harvest period, plant at two-week intervals avoiding hot summer temperatures. Press soil firmly over seeds.",
            details: {
              daysToMaturity: 24,
              isNew: false,
              seedCount: 250,
            },
            id: "RAD3",
            imgURL: "/img/products/RAD3.webp",
            inStock: 15,
            linkURL: "/shop/radishes/RAD3",
            price: 299,
            quantity: 4,
            reviews: {
              avg: 3,
              num: 46,
            },
            salePrice: "",
            title: "French Breakfast",
          },
        ],
        shipping: {
          address1: "25 Redwood St.",
          address2: "",
          city: "Portland",
          first: "John",
          last: "Smith",
          state: "ME",
          zip: "04101",
        },
        shippingSame: true,
      },
    ],
    currentOrder: {},
    error: null,
    isLoading: false,
  },
};

const store = configureStore({
  reducer: {
    orders: ordersReducer,
    modal: modalReducer,
  },
  preloadedState,
});

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(),
}));

let component;

beforeEach(() => {
  component = (
    <Provider store={store}>
      <Router>
        <SingleOrder />
      </Router>
    </Provider>
  );
});

afterEach(() => {
  cleanup();
});

describe("<SingleOrder />", () => {
  it("should render the component without crashing", () => {
    useParams.mockReturnValue({ id: "1" });
    render(component);
    const orderNumber = screen.getByText("Order #1");
    const errorText = screen.queryByText("Page Not Found");
    expect(errorText).not.toBeInTheDocument();
    expect(orderNumber).toBeInTheDocument();
  });

  it("should render the not found page if no order number is provided by useParams", () => {
    useParams.mockReturnValue({ id: undefined });
    render(component);

    const errorText = screen.getByText("Page Not Found");

    expect(errorText).toBeInTheDocument();
  });

  it("should open the confirm modal when the return order button is clicked", async () => {
    useParams.mockReturnValue({ id: "1" });

    render(component);
    const returnButton = screen.getByRole("button", { name: "Return Order" });
    const user = userEvent.setup();
    await user.click(returnButton);
    const {
      modal: { title, id, isConfirmModalOpen },
    } = store.getState();

    expect(title === orderNumber).toBe(true);
    expect(id === databaseId).toBe(true);
    expect(isConfirmModalOpen).toBe(true);
  });
});
