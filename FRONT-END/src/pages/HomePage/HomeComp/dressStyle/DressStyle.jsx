import React from 'react'
import "./dressStyle.css"
import AOS from 'aos';
import 'aos/dist/aos.css';
const DressStyle = () => {
  AOS.init()
  return (
    <section className='dressStyleSection'>
      <div className='container dressStyleContainer'>
        <h1 className='commonHeading'>BROWSE BY DRESS STYLE</h1>
        <div className="styleContainer grid">
<div data-aos="fade-right" data-aos-duration="1500" data-aos-delay="100"
className='casual style'>Casual</div>
<div data-aos="fade-left" data-aos-duration="1500" 
data-aos-delay="200" className='formal style'>Formal</div>
<div  data-aos="fade-right" data-aos-duration="1500" 
data-aos-delay="300"  className='party style'>Party</div>
<div data-aos="fade-left" data-aos-duration="1500" data-aos-delay="400"
 className='gym style'>Gym</div>
        </div>
      </div>
    </section>
  )
}

export default DressStyle
