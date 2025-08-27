import React from 'react'
import "./hero.css"
import Button from '../../../../components/button/Button'
import AOS from 'aos';
import 'aos/dist/aos.css';
const Hero = () => {
  AOS.init()
  return (
    <main className='heroSection'>
      <div className='container grid heroContainer'>
        <div data-aos="fade-right" data-aos-duration="1500" className='heroContent'>
          <h1 className='heroHeading'>
            FIND CLOTHES THAT MATCHES YOUR STYLE
          </h1>
          <p className='subHeading'>
            Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.
          </p>
          <Button title="Shop Now" classname="btn" linkTo={"/shop"} />
          <div className="brandStatics flexContainer">
            <div className="inBrand">
              <p className='inBrandNum'>2000+</p>
              <p className='inBrandText'>International Brand</p>
            </div>
            <div className='line' />
            <div className="hqProducts">
<p className='inBrandNum'>2,0000+</p>
<p className='inBrandText'>High-Quality Products</p>
            </div>
            <div className='line line2' />
            <div className="happyCustomer">
            <p className='inBrandNum'>30,000+</p>
            <p className='inBrandText'>Happy Customers</p>
            </div>
          </div>
        </div>
        <div data-aos="fade-up" data-aos-duration="1500" className="heroImg">



        </div>
      </div>
    </main>
  )
}

export default Hero
