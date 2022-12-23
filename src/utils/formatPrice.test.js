import { formatPrice } from "./formatPrice";

describe("formatPrice()", () => {
  it("should correctly format price in USD as a string when passed a number input in cents", () => {
    const input = 399;
    const result = formatPrice(input);
    expect(result).toEqual("$3.99");
  });

  it("should throw an error when passed an invalid input", () => {
    const invalidInputs = ["", [], {}, 0, "399"];
    invalidInputs.forEach((input) => {
      expect(formatPrice.bind(null, input)).toThrowError("Invalid price input");
    });
  });
});
