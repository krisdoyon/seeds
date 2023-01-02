import ProductCard from "./ProductCard";
import { render, screen } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom";

let testProps;

beforeEach(() => {
  testProps = {
    id: "id",
    title: "title",
    category: "category",
    price: 299,
    salePrice: "",
    inStock: 10,
    reviews: { num: 50, avg: 4 },
    details: { isNew: false },
    imgURL: "/img/id.jpg",
    linkURL: "/shop/category/id",
  };
});

describe("<ProductCard />", () => {
  it("should render the component without crashing", () => {
    render(
      <Router>
        <ProductCard {...testProps} />;
      </Router>
    );
    const card = screen.getByRole("article");
    expect(card).toBeInTheDocument();
  });

  it("should render the on sale tag when passed a sale price through props", () => {
    testProps.salePrice = 399;
    render(
      <Router>
        <ProductCard {...testProps} />;
      </Router>
    );
    const onSaleTag = screen.getByText("on sale", { exact: false });
    expect(onSaleTag).toBeInTheDocument();
  });

  it("should NOT render the on sale tag when sale price is an empty string", () => {
    testProps.salePrice = "";
    render(
      <Router>
        <ProductCard {...testProps} />;
      </Router>
    );
    const onSaleTag = screen.queryByText("on sale", { exact: false });
    expect(onSaleTag).not.toBeInTheDocument();
  });

  it("should render the low stock tag when 5 or less are in stock", () => {
    testProps.inStock = 5;
    render(
      <Router>
        <ProductCard {...testProps} />;
      </Router>
    );
    const lowStockTag = screen.getByText("low stock", { exact: false });
    expect(lowStockTag).toBeInTheDocument();
  });

  it("should NOT render the low stock tag when more than 5 are in stock", () => {
    testProps.inStock = 6;
    render(
      <Router>
        <ProductCard {...testProps} />;
      </Router>
    );
    const lowStockTag = screen.queryByText("low stock", { exact: false });
    expect(lowStockTag).not.toBeInTheDocument();
  });

  it("should render the sold out tag when 0 are in stock", () => {
    testProps.inStock = 0;
    render(
      <Router>
        <ProductCard {...testProps} />;
      </Router>
    );
    const soldOutTag = screen.getByText("sold out", { exact: false });
    expect(soldOutTag).toBeInTheDocument();
  });

  it("should NOT render the sold out tag when more than 0 are in stock", () => {
    testProps.inStock = 1;
    render(
      <Router>
        <ProductCard {...testProps} />;
      </Router>
    );
    const soldOutTag = screen.queryByText("sold out", { exact: false });
    expect(soldOutTag).not.toBeInTheDocument();
  });
});
