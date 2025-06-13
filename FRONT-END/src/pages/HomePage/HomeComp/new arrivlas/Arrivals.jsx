import React from 'react'
import "./arrivals.css"
import Button from "../../../../components/button/Button"
import Products from '../products/Products'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';

import AOS from 'aos';
import 'aos/dist/aos.css';

const Arrivals = ({heading , product}) => {




  AOS.init()
  
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4, // Default number of slides visible
    slidesToScroll: 4,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024, // Screen width <= 1024px
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2, // Show 3 slides on tablets
        },
      },
      {
        breakpoint: 768, // Screen width <= 768px
        settings: {
          slidesToShow: 2, // Show 2 slides on mobile landscape
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 680, // Screen width <= 480px
        settings: {
          slidesToShow: 1, // Show 1 slide on mobile portrait
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <section data-aos="zoom-in" className='sectionArrivals'>
      <div  className='container arrivalContainer'>
        <h1  className='commonHeading'>{heading}</h1>
        <Slider {...settings} >
        {product.map(({ id , title , price , images , ratingImg , rating , actualPrice, desc}) => (
          <div key={id} className="arrivalsProducts grid">
          <Products id={id} img={images} title={title}  starImg={ratingImg} rating={rating} price={price} actualPrice={actualPrice && actualPrice} desc={desc} />
          </div>
        ))}
        </Slider>
         <div className='viewAllBtn'>
         <Button linkTo={"/shop"} title="view All" classname="arrivalsBtn"/>
         </div>
       
      </div>
    
    </section>
   
  )
}

export default Arrivals
