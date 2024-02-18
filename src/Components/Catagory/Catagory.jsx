import React from "react";
import { catagoryInfos } from "./CatagoryFullinfo";
import CatagoryCard from "./CatagoryCard";
import classes from "./catagory.module.css";
function Catagory() {
  return (
    <section className={classes.Catagory__container}>
      {catagoryInfos.map((infos,index) => (
        <CatagoryCard key={index} data={infos} />
      ))}
    </section>
  );
}


export default Catagory;
