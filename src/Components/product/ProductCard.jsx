import React, { useContext } from "react";
import Rating from "@mui/material/Rating";
import CurrencyFormat from "../CurrencyFormat/CurrencyFormat";
import classes from "./product.module.css";
import { Link } from "react-router-dom";
import { DataContext } from "../DataProvider.js/DataProvider";
import { Type } from "../../Utility/Action";
function ProductCard({ product, flex, renderDesc,renderAdd }) {
  const { title, rating, price, id, image, description } = product;
  
  const [state, dispatch] = useContext(DataContext);

  // console.log(state);

  const addToCart = () => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item: {
        title,
        rating,
        price,
        id,
        image,
        description,
      },
    });
  };

  return (
    <div
      className={`${classes.card__container} ${
        flex ? classes.product__flexed : ""
      }`}
    >
      <Link to={`/product/${id}`}>
        <img src={image} alt="" />
      </Link>
      <div>
        <h3>{title}</h3>
        {renderDesc && <div style={{ maxWidth: "750px" }}>{description}</div>}
        <div className={classes.rating}>
          <Rating value={rating?.rate} precision={0.1} />
          <small>{rating?.count}</small>
        </div>
        <div>
          <CurrencyFormat amount={price} />
        </div>
      </div>

      {renderAdd && 
        <button className={classes.button} onClick={addToCart}>
          {" "}
          Add to Cart
        </button>
      }
    </div>
  );
}

export default ProductCard;
