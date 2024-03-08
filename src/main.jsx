import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import HomeScreen from "./pages/HomeScreen.jsx";
import ProductScreen from "./pages/ProductScreen.jsx";
import Contcat from "./pages/Contcat.jsx";
import About from "./pages/About.jsx";
import Policy from "./pages/Policy.jsx";
import store from "./store.js";
import CartScreen from "./pages/CartScreen.jsx";
import LoginScreen from "./pages/LoginScreen.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import RegisterScreen from "./pages/RegisterScreen.jsx";
import ShippingScreen from "./pages/ShippingScreen.jsx";
import PaymentScreen from "./pages/PaymentScreen.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import PlaceOrderScreen from "./pages/PlaceOrderScreen.jsx";
import OrdersScreen from "./pages/OrdersScreen.jsx";
import ProfileScreen from "./pages/ProfileScreen.jsx";
import SucessScreen from "./pages/SucessScreen.jsx";
import AdminRoute from "./components/AdminRoute.jsx";
import UserListScreen from "./pages/Admin/UserListScreen.jsx";
import ProductListScreen from "./pages/Admin/ProductListScreen.jsx";
import OrderListScreen from "./pages/Admin/OrderListScreen.jsx";
import ProductEditScreen from "./pages/Admin/ProductEditScreen.jsx";
import UserEditScreen from "./pages/Admin/UserEditScreen.jsx";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/search/:keyword" element={<HomeScreen />} />
      <Route path="/product/:id" element={<ProductScreen />} />
      <Route path="/contact" element={<Contcat />} />
      <Route path="/about" element={<About />} />
      <Route path="/policy" element={<Policy />} />
      <Route path="/cart" element={<CartScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="/logout" element={<LoginScreen />} />
      <Route path="/reset-password/:resetToken" element={<ResetPassword />} />
      <Route path="" element={<PrivateRoute />}>
        <Route path="/payment" element={<PaymentScreen />} />
        <Route path="/shipping" element={<ShippingScreen />} />
        <Route path="/place-order" element={<PlaceOrderScreen />} />
        <Route path="/order/:id" element={<OrdersScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/sucess-screen" element={<SucessScreen />} />
      </Route>
      {/* ------------- */}
      <Route path="/" element={<AdminRoute />}>
        <Route path="/admin/users" element={<UserListScreen />} />
        <Route path="/admin/users/:id/edit" element={<UserEditScreen />} />
        <Route path="/admin/products" element={<ProductListScreen />} />
        {/* <Route
          path="/admin/products/:pageNumber"
          element={<ProductListScreen />}
        /> */}
        <Route path="/admin/orders" element={<OrderListScreen />} />
        <Route path="/admin/product/:id/edit" element={<ProductEditScreen />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
