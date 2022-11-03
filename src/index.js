import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import axios from "axios";
//import { ChakraProvider } from "@chakra-ui/react";
// import { BrowserRouter } from "react-router-dom";
import { store } from "./redux/store";
import { Provider } from "react-redux";

axios.defaults.baseURL = "https://witbybibackend.herokuapp.com/";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <ChakraProvider> */}
        <App />
      {/* </ChakraProvider> */}
    </Provider>
  </React.StrictMode>
);
