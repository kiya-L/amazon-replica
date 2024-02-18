import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LayOut from "../../LayOut/LayOut";
import axios from "axios";
import { productURL } from "../../../Api/endPoints";
import ProductCard from "../../product/ProductCard";
import Loader from "../../Loader/Loader";

function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${productURL}/products/${productId}`)
      .then((res) => {
        setProduct(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);
  return (
    <LayOut>
      {isLoading ? (
        <Loader />
      ) : (
        <ProductCard
          product={product}
          flex={true}
          renderDesc={true}
          renderAdd={true}
          //needAddButton={true}
        />
      )}
    </LayOut>
  );
}

export default ProductDetail;
