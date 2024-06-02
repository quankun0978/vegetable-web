import React, { Suspense } from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";

import { store } from "./redux/store.js";
import "./index.scss";
import { Spin } from "antd";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Suspense
          fallback={
            <Spin
              size="large"
              style={{
                height: "100%",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "fixed",
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
              }}
            />
          }
        >
          <App />
        </Suspense>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
