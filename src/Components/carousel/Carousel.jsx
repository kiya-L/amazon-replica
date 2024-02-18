import React from 'react'
import {Carousel} from 'react-responsive-carousel'
import { img } from './img/data';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import classes from "./carousel.module.css";
function CarouselEffect() {
  return (
    <div>
      <Carousel
        autoPlay={true}
        infiniteloop={true}
        showIndicators={false}
        showThumbs={false}
      >
        {img.map((ImageItemLink) => {
          return <img key={ImageItemLink} src={ImageItemLink} alt='' />;
        })}
      </Carousel>
      <div className={classes.hero__img}></div>
    </div>
  );
}

export default CarouselEffect
