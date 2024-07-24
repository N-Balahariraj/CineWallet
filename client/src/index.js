// React Libraries
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"

// Styles
import "./styles/index.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import "mdbreact/dist/css/mdb.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
