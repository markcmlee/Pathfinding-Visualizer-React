import React from "react";
import { render } from "react-dom";
import App from "./App";
import { Provider } from "./Context";

// render(<App />, document.querySelector("#root"));

render(
  <Provider>
    <App />
  </Provider>,
  document.querySelector("#root")
);
