export const formatCheckoutInput = (name, value) => {
  switch (name) {
    case "payExpYear":
      value = value.replaceAll(" ", "");
      if (value.length > 4) {
        value = value.slice(0, 4);
      }
      break;
    case "payCardNum":
      value = value.replaceAll(" ", "");
      if (value.length > 16) {
        value = value.slice(0, 16);
      }
      if (value.length) {
        value = value
          .replaceAll(" ", "")
          .match(/.{1,4}/g)
          .join(" ");
      }
      break;
    case "payCardCode":
      value = value.replaceAll(" ", "");
      if (value.length > 4) {
        value = value.slice(0, 4);
      }
      break;
    case "billZip":
    case "shipZip":
      break;
    default:
      break;
  }
  return value;
};
