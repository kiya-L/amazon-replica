import React, { useEffect, useState } from "react";
import LayOut from "../../LayOut/LayOut";
import { useParams } from "react-router-dom";
import axios from "axios";
import { productURL } from "../../../Api/endPoints";
import ProductCard from "../../product/ProductCard";
import classes from "./Results.module.css";
import Loader from "../../Loader/Loader";

function Results() {
  const [result, setResult] = useState([]);
  const { categoryName } = useParams();
  const [isLodeing,setIsLoding]=useState(false)

  useEffect(() => {
    axios.get(`${productURL}/products/category/${categoryName}`) 
      .then((res) => {
        setResult(res.data);
        setIsLoding(false)
      })
      .catch((err) => {
        console.log(err);
        setIsLoding(false)
      });
  }, []);

  return (
    <LayOut>
      <section>
        <h1 style={{ padding: "30px" }}>Results</h1>
        <p style={{ padding: "30px" }}>category/{categoryName}</p>
        <hr />
        {isLodeing ? (
          <Loader />
        ) : (
          <div className={classes.product__container}>
            {result?.map((product) => (
              <ProductCard 
              key={product.id}
              product={product}
              renderDesc={false}
              renderAdd={true} />
            ))}
          </div>
        )}
      </section>
    </LayOut>
  );
}

export default Results;
