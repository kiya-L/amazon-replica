import React, { useContext, useState } from "react";
import LayOut from "../../LayOut/LayOut";
import classes from "./Peyment.module.css";
import { DataContext } from "../../DataProvider.js/DataProvider";
import ProductCard from "../../product/ProductCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../CurrencyFormat/CurrencyFormat";
import { axiosInstance } from "../../../Api/axios";
import { ClipLoader } from "react-spinners";
import { db } from "../../../Utility/firebase";
import { useNavigate } from "react-router-dom";
import { Type } from "../../../Utility/Action";

function Peyment() {
  const [{ user, basket },dispatch] = useContext(DataContext);
  console.log(user);
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  const total = basket?.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);

  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const navigate=useNavigate()

 const handleChange = (e) => {
   const errorMessage = e?.error?.message || "";
   setCardError(errorMessage);
 };

const handelePeyment = async (e) => {
  e.preventDefault();

  try {
    setProcessing(true);
    // 1. backend || function ---->contact to the client secret
    const response = await axiosInstance({
      method: "POST",
      url: `/payment/create?total=${total * 100}`,
    });

    console.log(response.data);
    const clientSecret = response.data?.clientSecret;
    // 2. client side (react side confirmation)
    const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });
    // 3. after the confirmation--->order Firestore database save, clear basket
    await db
      .collection("users")
      .doc(user.uid)
      .collection("orders")
      .doc(paymentIntent.id)
      .set({
        basket: basket,
        amount: paymentIntent.amount,
        created: paymentIntent.created,
      });
    // empty the basket
    dispatch({ type: Type.EMPTY_BASKET });
    setProcessing(false);
    navigate("/order", { state: { msg: "You have placed a new order" } });
  } catch (error) {
    console.error("error", error.message); // Log the error inside the catch block
    setProcessing(false);
  }
};



  return (
    <LayOut>
      {/* header */}
      <div className={classes.peyment__header}>Checkout({totalItem}) items</div>

      {/* payment method */}
      <section className={classes.Peyment}>
        {/* address */}
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            <div>123 React Lane</div>
            <div>Jaksonville FL</div>
          </div>
        </div>
        <hr />

        {/* product */}
        <div className={classes.flex}>
          <h3>Reviwe items and Delivery</h3>
          <div>
            {basket?.map((item) => (
              <ProductCard product={item} flex={true} />
            ))}
          </div>
        </div>
        <hr />

        {/* card info */}
        <div className={classes.flex}>
          <h3>Payments Methods</h3>
          <div className={classes.peyment__card__container}>
            <div className={classes.peyment__details}>
              <form onSubmit={handelePeyment}>
                {/* error */}
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}
                {/* card */}
                <CardElement onChange={handleChange} />
                {/* price */}
                <div className={classes.peyment__price}>
                  <div>
                    <span style={{ display: "flex", gap: "10px" }}>
                      <p>Total Order</p> | <CurrencyFormat amount={total} />
                    </span>
                  </div>
                  <button type="submit">
                    {processing ? (
                      <div className={classes.loading}>
                        <ClipLoader color="gray" size={12} />
                        <p>please Wait...</p>
                      </div>
                    ) : (
                      "pay now"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Peyment;
