import React from "react";
import ShopBanner from "../components/ShopBanner";
import ShopControls from "../components/ShopControl";
import ProductList from "../components/Products";
import ProductDetails from "./ProductDetails ";
import Warranty from "../components/Warranty";

const Shop = () => {
  return (
    <>
      <ShopBanner />
      <ShopControls />
      <ProductList />
      {/* <ProductDetails /> */}
      <Warranty/>
    </>
  );
};

export default Shop;
