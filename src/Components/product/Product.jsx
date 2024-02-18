import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import classes from "./product.module.css";
import Loader from "../Loader/Loader";
function Product() {
  const [products, setProducts] = useState([]);
  const [isLodeing, setIsLoding] = useState(false);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        setProducts(res.data);
       setIsLoding(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoding(false);
      });
  }, []);

  return (
    <>
      {isLodeing ? (
        <Loader />
      ) : (
        <section className={classes.Product__container}>
          {products &&
            products.map((singleProduct) => (
              <ProductCard 
              product={singleProduct}
              key={singleProduct.id}
              renderAdd={true} />
            ))}
        </section>
      )}
    </>
  );
}

export default Product;
