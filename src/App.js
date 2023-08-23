import "./App.css";

import React from "react";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import Hero from "./components/Layout/Hero";
import Meals from "./components/Meals/Meals";

import CartProvider from "./store/CartProvider";

function App() {
  return (
    <CartProvider>
      <Header title="Food APP" />

      <main>
        <Hero title="Your Favorite Meals, Just a Click Away – Order Now!" />
        <Meals />
      </main>

      <Footer title="Food APP" />
    </CartProvider>
  );
}

export default App;
