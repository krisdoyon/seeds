import { render, screen } from "@testing-library/react";
import Stars from "./Stars";

describe("Stars component", () => {
  it("should render 1 full star with four empty stars", () => {
    const testProps = { avg: 1, num: 50 };

    render(<Stars {...testProps} />);
    const fullStarIcons = screen.getAllByTitle("full star");
    const halfStarIcons = screen.queryAllByTitle("half star");
    const emptyStarIcons = screen.getAllByTitle("empty star");

    expect(fullStarIcons.length === 1).toBe(true);
    expect(halfStarIcons.length === 0).toBe(true);
    expect(emptyStarIcons.length === 4).toBe(true);
  });

  it("should render 3 full stars, 1 half star, and one empty star", () => {
    const testProps = { avg: 3.5, num: 50 };

    render(<Stars {...testProps} />);
    const fullStarIcons = screen.getAllByTitle("full star");
    const halfStarIcons = screen.getAllByTitle("half star");
    const emptyStarIcons = screen.getAllByTitle("empty star");

    expect(fullStarIcons.length === 3).toBe(true);
    expect(halfStarIcons.length === 1).toBe(true);
    expect(emptyStarIcons.length === 1).toBe(true);
  });

  it("should render 5 full stars", () => {
    const testProps = { avg: 5, num: 50 };

    render(<Stars {...testProps} />);
    const fullStarIcons = screen.getAllByTitle("full star");
    const halfStarIcons = screen.queryAllByTitle("half star");
    const emptyStarIcons = screen.queryAllByTitle("empty star");

    expect(fullStarIcons.length === 5).toBe(true);
    expect(halfStarIcons.length === 0).toBe(true);
    expect(emptyStarIcons.length === 0).toBe(true);
  });
});
