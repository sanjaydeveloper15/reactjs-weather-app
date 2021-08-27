import React from "react";
import ReactDOM from "react-dom";
import "./css/style.css";
//import App from './App';
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.css";
import Header from "./components/header";
import Footer from "./components/footer";
import Home from "./components/home";

ReactDOM.render(
  <React.StrictMode>
    <div className="container-fluid">
      <Header />
      <Home />
      <Footer />
    </div>
  </React.StrictMode>,
  document.getElementById("root")
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
