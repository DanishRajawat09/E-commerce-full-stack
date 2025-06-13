import React from 'react'
import "./cartCalcStyles.css"
import Button from "../../../../components/button/Button"
import { useSelector } from 'react-redux'
const CartCalc = () => {

  const {total} = useSelector((state) => state.calc)

   const offPer = Math.ceil(total - (total * (80 / 100)))

let grandTotal;

if(total > 0){
  grandTotal = total - offPer + 15 
}else{
  grandTotal = 0
}

  
  return (
    <div className='clacSection'>
      <h2 className='calcHeading'>Order Summary</h2>
      <div className="calcArea flexContainer">
        <div className="subTotalArea flexContainer">
          <p className='subTotal'>SubTotal</p>
          <p className='subTotalPrice'>${total}</p>
        </div>
        <div className="subTotalArea flexContainer">
          <p className='subTotal'>Discount (-20%)</p>
          <p className='subTotalPrice discount'>-${offPer}</p>
        </div>
        <div className="subTotalArea flexContainer">
          <p className='subTotal'>Delivery Fee</p>
          <p className='subTotalPrice'>$15</p>
        </div>
        <hr />
        <div className="subTotalArea flexContainer">
          <p className='total'>total</p>
          <p className='subTotalPrice'>${grandTotal}</p>
        </div>
        <div className="promoCodeArea flexContainer">
          <div className="promoInputArea flexContainer">
            <img src="promoIcon.png" alt="PromoCodeIcon" />
            <input className='promoCodeInput' type="text"  placeholder='Enter your Promo Code'/>
          </div> 
        <Button title={"Apply"} classname={"cartPromo"} />
        </div>
        <button className="goToChkOut flexContainer">Go To CheckOut <img src="arrowRight.png" alt="" /></button>
      </div>
    </div>
  )
}

export default CartCalc
