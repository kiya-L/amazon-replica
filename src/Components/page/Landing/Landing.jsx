import React from "react";
import LayOut from "../../LayOut/LayOut";
import Catagory from "../../Catagory/Catagory";
import Carousel from "../../carousel/Carousel";
import Product from "../../product/Product";

function Landing() {
  return (
    <LayOut>
      <Carousel />
      <Catagory />
      <Product />
    </LayOut>
  );
}

export default Landing;
