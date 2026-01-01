import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
// import App from "./QRAPHQL/App";
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "@apollo/client/react";
import client from "./QRAPHQL/apolloClient";

createRoot(document.getElementById("root")).render(
  <ApolloProvider client={client}>
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
  </ApolloProvider>
);
