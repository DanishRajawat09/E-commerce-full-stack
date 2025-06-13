import React, { useRef } from 'react'
import "./testimonials.css"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import AOS from 'aos';
import 'aos/dist/aos.css';
const Testimonials = () => {
  AOS.init()
    const sliderRef = useRef(null);
    const testimonialData = [
        {
            id : 1,
            starImg : "5star.png",
            title : "Sarah M.",
            rightMark : "rightMark.png",
testimonialText : "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations"
        },
         {  
            id : 2,
            starImg : "5star.png",
            title : "Alex K.",
            rightMark : "rightMark.png",
testimonialText : "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions."
        },
         {  
            id : 3,
            starImg : "5star.png",
            title : "James L.",
            rightMark : "rightMark.png",
testimonialText : "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends."
        },
         {  
            id : 4,
            starImg : "5star.png",
            title : "Sarah M",
            rightMark : "rightMark.png",
testimonialText : "I’m beyond impressed with Shop.co! They designed a stunning website that is easy to navigate and perfectly showcases my brand. Their expertise truly stands out. I would recommend them to anyone"
        },
         { 
            id : 5,
            starImg : "5star.png",
            title : "David R.",
            rightMark : "rightMark.png",
testimonialText : "Shop.co transformed my ideas into a functional, beautiful website. The process was seamless, and their attention to detail was remarkable. I’m thrilled with the results and will definitely work with them again."
        },
         {  
            id : 6,
            starImg : "5star.png",
            title : "Emily T.",
            rightMark : "rightMark.png",
testimonialText : "Shop.co created a professional, responsive website for my business. The team was efficient, creative, and attentive to my needs. I highly recommend them for anyone seeking exceptional web design services"
        },

    ]
    const settings = {

        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3, // Default number of slides visible
        slidesToScroll: 1,
     
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
          {
            breakpoint: 1024, // Screen width <= 1024px
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1, // Show 3 slides on tablets
            },
          },
          {
            breakpoint: 768, // Screen width <= 768px
            settings: {
              slidesToShow: 2, // Show 2 slides on mobile landscape
              slidesToScroll: 1,
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
        <section className='testimonialSection'>
            <div className='container'>
                <div data-aos="zoom-in" className="headArea flexContainer">
                    <h1 className='commonHeading'>OUR HAPPY CUSTOMERS</h1>
                    <div className="arrows">
                    <img
              src="arrow-l.png"
              alt="arrow-left"
              onClick={() => sliderRef.current.slickPrev()}
              style={{ cursor: "pointer" }}
            />
            <img
              src="arrow-r.png"
              alt="arrow-right"
              onClick={() => sliderRef.current.slickNext()}
              style={{ cursor: "pointer" }}
            />
                    </div>
                </div>
                <div className="testimonials">
<Slider ref={sliderRef} {...settings}>
{testimonialData.map((testimonial) => (
    <div key={testimonial.id}>
    <div  className='testimonialCard'>
        <div className="stars">
            <img src={testimonial.starImg} alt="stars" />
        </div>
        <div className="textMark flexContainer">
        <h3 className='titleTestimonial'>{testimonial.title}</h3>
        <img src={testimonial.rightMark} alt="rightMark" />
        </div>
        <p className='testimonialText'>{testimonial.testimonialText}</p>
    </div>
    </div>
))}
</Slider>
                </div>
            </div>
        </section>
    )
}

export default Testimonials
