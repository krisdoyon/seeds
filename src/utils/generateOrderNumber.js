export const generateOrderNumber = () => {
  return Array.from({ length: 6 })
    .map((_) => Math.round(Math.random() * 9))
    .join("");
};
