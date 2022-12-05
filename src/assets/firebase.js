"use strict";

import { API_URL } from "./config.js";
import axios from "axios";
import data from "./seeds.json" assert { type: "json" };

// const API_URL = "https://seeds-22950-default-rtdb.firebaseio.com/";

// const postProduct = async (product) => {
//   await axios.post(`${API_URL}/products.json`, product);
// };

// data.forEach((product) => {
//   postProduct(product);
// });
