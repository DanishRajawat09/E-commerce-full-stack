import React from 'react'
import "./footer.css"
const Footer = () => {
  return (
    <div className='footer'>
      <div className="container">
        <div className="companyContainer grid">
          <div className='companyDetails'>
            <h2 className='icon'>shop.co</h2>
            <p className="companyText">
              We have clothes that suits your style and which you’re proud to wear. From women to men.
            </p>
            <div className="socialIcons flexContainer">
              <img src="1.png" alt="" />
              <img src="2.png" alt="" />
              <img src="3.png" alt="" />
              <img src="4.png" alt="" />
            </div>
          </div>
         <div className="footerNav grid">
            <div className="companyArea">
              <h3 className='footerHeading'>COMPANY</h3>
              <ul className='footerList flexContainer'>
                <li>About</li>
                <li>Feature</li>
                <li>Works</li>
                <li>Career</li>
              </ul>
            </div>
            <div className="companyArea">
              <h3 className='footerHeading'>HELP</h3>
              <ul className='footerList flexContainer'>
                <li>Customer Support</li>
                <li>Delivery Details</li>
                <li>Terms & Conditions</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
            <div className="companyArea">
              <h3 className='footerHeading'>FAQ</h3>
              <ul className='footerList flexContainer'>
                <li>Account</li>
                <li>Manage Deliveries</li>
                <li>Orders</li>
                <li>Payments</li>
              </ul>
            </div>
            <div className="companyArea">
              <h3 className='footerHeading'>RESOURCES</h3>
              <ul className='footerList flexContainer'>
                <li>Free eBooks</li>
                <li>Development Tutorial</li>
                <li>How to - Blog</li>
                <li>Youtube Playlist</li>
              </ul>
            </div>
            </div>
        </div>
        <hr />
        <div className="copyRightArea flexContainer">
<div className="copyRightText">
<p className='copyRight'>Shop.co © 2000-2023, All Rights Reserved</p>
</div>
<div className="paymentImgs">
<img src="visa.png" alt="" />
<img src="debit.png" alt="" />
<img src="paypal.png" alt="" />
<img src="applePay.png" alt="" />
<img src="gpay.png" alt="" />
</div>
        </div>
      </div>
    </div>
  )
}

export default Footer
