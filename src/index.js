import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ScrollToTop from "./helpers/ScrollToTop";
import { Provider } from "react-redux";
import { store } from "./store";
import { BrowserRouter as Router } from "react-router-dom";
import { AppProvider } from "./context/context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AppProvider>
        <Router>
          <ScrollToTop />
          <App />
        </Router>
      </AppProvider>
    </Provider>
  </React.StrictMode>
);
