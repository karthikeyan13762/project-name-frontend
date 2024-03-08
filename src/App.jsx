import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
// import HomeScreen from "./pages/HomeScreen";
import { Outlet } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      <div className="d-flex flex-column min-vh-100">
        <Header />
        <main className="container-fluid py-3 flex-grow-1">
          <Outlet />
          <ToastContainer />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
