import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";

import Navbar from "./Navbar";
import Fruits from "./Fruits";
import Home from "./Home";
import Cart from "./Cart";
import Login from "./Login";
import Signup from "./Signup";
import Orders from "./Orders";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import Fruit from "./Data/Fruit.json";
import OrdersDetails from "./OrdersDetails";
import AdminFruits from "./AdminFruits";
function Ecomm() {
  let Navigate = useNavigate();
  // declare cart globally because cart items not to be lost after login
  let [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || [],
  );
  let productList = Fruit.fruits;
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  function addToCart(product) {
    const exist = cart.find((item) => item.id === product.id);
    if (exist) {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item,
        ),
      );
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    } // else
  } // addToCart function

  // function for increase qty
  function increaseQty(id) {
    //console.log("clicked",id);
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item,
      ),
    );
  }

  // function for decreaseqty
  function decreaseQty(id) {
    // console.log("clicked");

    setCart(
      cart
        .map((item) => (item.id === id ? { ...item, qty: item.qty - 1 } : item))
        .filter((item) => item.qty > 0),
    );
  }
  /// function to remove an item
  function removeItem(id) {
    setCart(cart.filter((item) => item.id !== id));
  }

  // function for place order
  async function placeOrder() {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    // to check login first
    if (!user) {
      alert(" Please login first....");
      return;
    }
    // check cart is empty
    if (cart.length === 0) {
      alert("cart is empty");
      return;
    }
    // calculate total
    const total = cart.reduce((sum, item) => sum + item.qty * item.price, 0);

    const newOrder = {
      userId: user.email, // user.id ||user.email
      items: cart,
      date: new Date().toLocaleString(),
      totalAmount: total,
    };
    try {
      await fetch("http://localhost:3000/orders", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(newOrder),
      });
      alert("Order Sucessfully placed");
      // here clear setcart
      setCart([]);
      //remove for localstorage
      localStorage.removeItem("cart");
      // redirect orders
      Navigate("/orders");
    } catch (error) {
      console.error(error);
      alert("something went wrong");
    }
  }

  return (
    <>
      <Navbar cart={cart} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/fruits"
          element={
            <Fruits
              productList={productList}
              cart={cart}
              addToCart={addToCart}
              increaseQty={increaseQty}
              decreaseQty={decreaseQty}
            />
          }
        />
        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              increaseQty={increaseQty}
              decreaseQty={decreaseQty}
              removeItem={removeItem}
              placeOrder={placeOrder}
            />
          }
        />

        <Route path="/orders" element={<Orders />} />
        <Route path="/order/:id" element={<OrdersDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<AdminFruits />} />
      </Routes>
      <Footer />
    </>
  );
}

export default Ecomm;
