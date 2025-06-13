import React from 'react'
import "./NL.css"
import Button from '../../button/Button'
import AOS from 'aos';
import 'aos/dist/aos.css';
const NewsLatter = () => {
    AOS.init()
    return (
        // <div className="container">
        <div data-aos="fade-up" className='newsLatter flexContainer container'>
            <div className="nlText">
                STAY UPTO DATE ABOUT <br/>OUR LATEST OFFERS
            </div>
            <div className="nlUserInput">

                <div className="inputArea flexContainer">
                    <img src="email.png" alt="emailIcon" />
                    <input className='inputEmail' type="text" placeholder='Enter your email' />

                </div>
                <Button title="Subscribe to Newsletter" classname="nlButton"/>
            </div>
        </div>
        // </div>
    )
}

export default NewsLatter
