export const formatPrice = (price) => {
  if (!price || typeof price !== "number")
    throw new Error("Invalid price input");
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price / 100);
};
