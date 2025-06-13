import React from 'react'
import "./BrandBelt.css"
import AOS from 'aos';
import 'aos/dist/aos.css';
const BrandBelt = () => {
  AOS.init()
  return (
    <section  className='brandSection'>
      <div className="container grid brandContainer">
        <img data-aos="fade-left" className='versache' src="versache.png" alt="" />
        <img data-aos="fade-left" className='zara' src="zara.png" alt="" />
        <img data-aos="fade-left" className='gucci' src="gucci.png" alt="" />
        <img data-aos="fade-left" className='prada' src="prada.png" alt="" />
        <img data-aos="fade-left" className='ck' src="ck.png" alt="" />
      </div>
    </section>
  )
}

export default BrandBelt
