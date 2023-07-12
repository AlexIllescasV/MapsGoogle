import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { AppRouter } from "./Views/Router/AppRouter";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default App;
