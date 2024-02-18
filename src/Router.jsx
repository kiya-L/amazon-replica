import React from 'react'
import { BrowserRouter as Router, Routes, Route, redirect } from "react-router-dom";
import Landing from "./Components/page/Landing/Landing";
import Auth from "./Components/page/Auth/Auth";
import Peyment from "./Components/page/Peyment/Peyment";
import Orders from "./Components/page/Orders/Orders";
import Cart from "./Components/page/Cart/Cart";
import Results from './Components/page/Results/Results';
import ProductDetail from './Components/page/ProductDetail/ProductDetail';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
const stripePromise = loadStripe(
  "pk_test_51OjpEwCMCMRJQoPZx2iIQ5XMV0IVVfoUgX6x6b6P8Bk0wIXhVUMy5mZtXkx1dErbteblTa9xFYhRfZsq7WBzoqTl00v2CgPsLi"
);
function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/peyments"
          element={
            <ProtectedRoute msg={"you must login"} redirect={"/peyments"}>
              <Elements stripe={stripePromise}>
                <Peyment />
              </Elements>
            </ProtectedRoute>
          }
        />
        <Route
          path="/order"
          element={
            <ProtectedRoute
              msg={"you must login in to access orders"}
              redirect={"/order"}
            >
              <Orders />
            </ProtectedRoute>
          }
        />
        <Route path="/category/:categoryName" element={<Results />} />
        <Route path="/product/:productId" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default Routing;
