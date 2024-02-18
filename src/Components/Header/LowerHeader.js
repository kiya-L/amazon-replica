import React from 'react'
import classes from "./header.module.css";
import { IoIosMenu } from "react-icons/io";
function LowerHeader() {
  return (
    <div className={classes.lower__container}>
      <ul>
        <li>
          <IoIosMenu />
          <p>ALL</p>
        </li>
        <li>Todey's Deals</li>
        <li>Costomer Service</li>
        <li>Registry</li>
        <li>Gift Cards</li>
        <li>Sell</li>
      </ul>
    </div>
  );
}

export default LowerHeader
