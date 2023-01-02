import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";

export function renderWithProvider(ui, reducer, preloadedState) {
  const store = configureStore({
    reducer,
    ...(preloadedState && { preloadedState }),
  });

  render(
    <Provider store={store}>
      <Router>{ui}</Router>
    </Provider>
  );

  return { store };
}
