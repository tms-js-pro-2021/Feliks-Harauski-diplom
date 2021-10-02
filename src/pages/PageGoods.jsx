import React from "react";
import Footer from "../blocks/Footer";
import Mailing from "../blocks/Mailing";
import Header from "../blocks/Header";
import Products from "../blocks/Products";

export default function PageMain() {
  return (
    <>
      <Header minimal />
      <Products />

      <Mailing />
      <Footer />
    </>
  );
}
