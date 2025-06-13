import React from 'react'
import "./setQuantity.css"
import { useState } from 'react'
const SetQuantity = ({setQuantityProd , quantityProd}) => {
  
const handleDecrement = () => {
  if (quantityProd >  1) {
    setQuantityProd((prev) => prev - 1)
  }
}
const handleIncrement = () => {
  setQuantityProd((prev) => prev + 1)
}

  return (
  
        <div className='flexContainer quantityBar'>
           <button onClick={(e) => {handleDecrement()}} className='decrement'>-</button>
      <p className='quantity'>{quantityProd}</p>
      <button onClick={(e) => {handleIncrement()}} className='increment'>+</button>

    </div>

  )
}

export default SetQuantity
