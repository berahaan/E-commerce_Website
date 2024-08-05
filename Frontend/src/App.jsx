import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
//////////////////////////////// Admin users////////////////////////////////////////////////////////////
import Homeadmin from "./AdminUser/HomeAdmin";
import Addproduct from "./AdminUser/Addproduct";
import OrderedProduct from "./AdminUser/OrderedProduct";
import Navbar from "./AdminUser/Navbar";
import Productlist from "./AdminUser/Productlist";
import { CartProvider } from "./Customers/CartContext";
import Cart from "./Customers/Cart";
import Login from "./LoginRegister/Login";
import Register from "./LoginRegister/Register";
////////////////////////////////////////////////////////////////
/////////////this is intended for Customers only//////////////
import Checkout from "./Customers/Checkout";
import HomeCustomer from "./Customers/HomeCustomer";
import ProductlistCustomers from "./Customers/ProductlistCustomers";
import CustomerNavbar from "./Customers/CustomerNavbar";
import Home from "./LoginRegister/Home";
import { OrderProvider } from "./AdminUser/Emailcontext";
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
function App() {
  const [email, setEmail] = useState("");
  return (
    <OrderProvider>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login setEmail={setEmail} />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/customer/*"
              element={<CustomerNavbar email={email} />}
            >
              <Route index element={<Navigate to="HomeCustomer" />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="cart" element={<Cart />} />
              <Route path="HomeCustomer" element={<HomeCustomer />} />
              <Route
                path="productlistCustomer"
                element={<ProductlistCustomers />}
              />
              <Route path="Cart" element={<Cart />} />
            </Route>

            <Route path="/admin/*" element={<Navbar email={email} />}>
              <Route index element={<Navigate to="home" />} />
              <Route path="home" element={<Homeadmin />} />
              <Route path="product-list" element={<Productlist />} />
              <Route path="Order" element={<OrderedProduct />} />
              <Route path="Addproduct" element={<Addproduct />} />
            </Route>
          </Routes>
        </Router>
      </CartProvider>
    </OrderProvider>
  );
}

export default App;
