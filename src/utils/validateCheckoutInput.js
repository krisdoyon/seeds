export const validateCheckoutInput = (id, value) => {
  let hasError = false;
  let error = "";
  switch (id) {
    case "email":
      if (value.trim() === "") {
        hasError = true;
        error = "This is a required field";
      } else if (
        !/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(
          value
        )
      ) {
        hasError = true;
        error = "Invalid email address";
      }
      break;
    case "phone":
      if (value.trim() === "") {
        hasError = true;
        error = "This is a required field";
      } else if (!/^[0-9]+$/.test(value) || value.length !== 10) {
        hasError = true;
        error = "Enter a valid 10 digit phone number (numbers only)";
      }
      break;
    case "billFirst":
    case "shipFirst":
      if (value.trim() === "") {
        hasError = true;
        error = "This is a required field";
      }
      break;
    case "billLast":
    case "shipLast":
      if (value.trim() === "") {
        hasError = true;
        error = "This is a required field";
      }
      break;

    case "billAddress1":
    case "shipAddress1":
      if (value.trim() === "") {
        hasError = true;
        error = "This is a required field";
      }
      break;
    case "billCity":
    case "shipCity":
      if (value.trim() === "") {
        hasError = true;
        error = "This is a required field";
      }
      break;
    case "billZip":
    case "shipZip":
      if (value.trim() === "") {
        hasError = true;
        error = "This is a required field";
      } else if (!/(^\d{5}$)|(^\d{9}$)|(^\d{5}-\d{4}$)/.test(value)) {
        hasError = true;
        error = "Enter a valid zip code";
      }
      break;
    case "payName":
      if (value.trim() === "") {
        hasError = true;
        error = "This is a required field";
      }
      break;
    case "payCardNum":
      if (value.trim() === "") {
        hasError = true;
        error = "This is a required field";
      } else if (value.replaceAll(" ", "").length < 16) {
        hasError = true;
        error = "Enter a 16 digit credit card number";
      }
      break;
    case "payExpYear":
      if (value.trim() === "") {
        hasError = true;
        error = "This is a required field";
      } else if (!/^[0-9]+$/.test(value) || value.length !== 4) {
        hasError = true;
        error = "Enter the 4 digit expiration year";
      } else if (value < new Date().getFullYear()) {
        hasError = true;
        error = "Enter current or future year";
      }
      break;
    case "payCardCode":
      if (value.trim() === "") {
        hasError = true;
        error = "This is a required field";
      } else if (
        !/^[0-9]+$/.test(value) ||
        value.length < 3 ||
        value.length > 4
      ) {
        hasError = true;
        error =
          "Enter the 3 or 4 digit security code from the back of the card";
      }
      break;
    default:
      break;
  }
  return { hasError, error };
};
