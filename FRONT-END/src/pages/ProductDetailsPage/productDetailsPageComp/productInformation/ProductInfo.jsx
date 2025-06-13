import React, { useRef, useState } from 'react'
import "./productInfoStyles.css"
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { reviews, FAQs } from '../../../../api/HomePageProducts';
import Arrivals from "../../../HomePage/HomeComp/new arrivlas/Arrivals"

  
const ProductSecNav = () => {
const [activeSec , setActiveSec] = useState("selectDetails")


    const swiperRef = useRef(null);

    const goToSlide = (index) => {
      if (swiperRef.current) {
        swiperRef.current.slideTo(index); // Move to the specified slide
      }
    };
    return (
      <>
        <section className='productNav'>
            <div className="container flexContainer">
                <button onClick={() => {goToSlide(0); setActiveSec("selectDetails")}} className={`productDetails navBarProduct ${activeSec === "selectDetails" && "selectDetails"}`}>
                    Product Details
                </button>
                <button onClick={() => {goToSlide(1); setActiveSec("selectReview")}} className={`productReview navBarProduct ${activeSec === "selectReview" && "selectReview"}`}>
                    Rating & Review
                </button>
                <button onClick={() => {goToSlide(2); setActiveSec("selectFAQs")}} className={`productFAQ  navBarProduct ${activeSec === "selectFAQs" && "selectFAQs"}`}>
                    FAQs
                </button>
            </div>
        </section>
       <Swiper
       onSwiper={(Swiper) => { swiperRef.current = Swiper }}
      
        spaceBetween={0}
        // slidesPerView={1}
        
        className="productDetailsSlide"
       >
        <SwiperSlide>
            <div className="container detailsSlide">

            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className="container reviewSlide">
<div className="reviewNavArea flexContainer">
<h3 className='reviewHeading'>All Review</h3>
</div>
<div className="reviewArea grid">
{reviews.map(({date , title , starImg , desc ,markImg}) => (
   <div className='reviewCard'>
<div className="ratingOptions flexCOntainer">
    <img src={starImg} alt="starImg" />

</div>
<div className='titleArea flexContainer' >
<h2 className='reviewTitle'>{title}</h2>
<img src={markImg} alt="verified" />
</div>
<p className='description'>{desc}</p>
<p className='date'>Posted on {date}</p>
   </div>
))}
</div>
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className="container FAQsSlide">
<div className='faqHeadArea'>
<h3 className='reviewHeading'>FAQs</h3>
<p>frequently asked questions</p>
</div>
<div className="grid faqArea">


</div>
            </div>
        </SwiperSlide>

       </Swiper>
       {/* <Arrivals heading="YOU MIGHT ALSO LIKE"/> */}
      </>
    )
}

export default ProductSecNav
