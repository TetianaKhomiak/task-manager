import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.jsx";
import SearchProvider from "./context/SearchProvider.jsx";
import "./index.css";
import { store } from "./redux/store.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <SearchProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </SearchProvider>
);
