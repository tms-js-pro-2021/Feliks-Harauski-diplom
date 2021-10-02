import React from "react";
import Footer from "../blocks/Footer";
import GoodsType from "../blocks/GoodsType";
import Header from "../blocks/Header";
import HelpfulColumns from "../blocks/HelpfulColumns";
import Mailing from "../blocks/Mailing";
import OurSocial from "../blocks/OurSocial";
import Store from "../blocks/Store";

export default function PageMain() {
  return (
    <>
      <Header />
      <GoodsType />
      <Store />
      <HelpfulColumns />
      <OurSocial />
      <Mailing />
      <Footer />
    </>
  );
}
