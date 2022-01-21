import React from 'react';
import { Routes, Route, Link } from "react-router-dom";
import { GlobalProvider } from "./context/GlobalState";
import Home from './pages/Home';
import Cart from './pages/Cart';


 function TheRoutes ()  {
  return (
    <GlobalProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </GlobalProvider>
  );
}


export default TheRoutes
