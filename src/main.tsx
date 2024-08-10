import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";

export const baseUrl = "https://dolphin-app-fmayj.ondigitalocean.app";
export const userUrl = "https://www.snackbae.in/";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <React.StrictMode>
      <Provider store={store}>
        <App />
        <ToastContainer />
      </Provider>
    </React.StrictMode>
  </BrowserRouter>
);
