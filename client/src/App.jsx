import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails ";
import Cart from "./pages/Cart";
import ProductConparison from "./pages/ProductConparison";
import CheckOut from "./pages/CheckOut";
import Contact from "./pages/Contact";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            {/* Nested routes render inside <Outlet /> */}
            <Route index element={<Home />} />
            <Route path="shop" element={<Shop />} />
            <Route path="product/:id" element={<ProductDetails />} />
            <Route path="cart" element={<Cart />} />
            {/* <Route path="comparison" element={<ProductConparison/>} /> */}
            <Route path="checkout" element={<CheckOut/>} />
            <Route path="contact" element={<Contact/>} />
          </Route>
        </Routes>

        {/* ✅ Toast container is global, always available */}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnHover
          draggable
          theme="light"
        />
      </BrowserRouter>
    </>
  );
}

export default App;


