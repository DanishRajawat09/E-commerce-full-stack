import React from 'react'
import "./products.css"
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {addProduct} from "../../../../features/productData"
const Products = ({id, img, title, starImg, price, rating , actualPrice , desc  }) => {
    const dispatch =  useDispatch()
    const handleProducts = (img , title , starImg , price , rating , actualPrice , desc) => {
    
        dispatch(addProduct({id,img,title,rating,price,actualPrice,starImg , desc}))
      
    }
    
    return (
        <Link to={"/productDetails"} className='productLink'>
        <div onClick={() => { handleProducts(img , title , starImg , price , rating , actualPrice , desc) }} className="products ">
            <div className="productImg">
                <img className='mainImg' src={img} alt={title} />
            </div>
            <p className='title'>{title}</p>
            <div className='flexContainer rating'>
                <img src={starImg} alt={starImg} />
                <p className='rate'>{rating}</p>
            </div>
           <div className="priceArea flexContainer">
           <div className='price'>${price}</div>
            {actualPrice && (
                <div className='actualPrice'>${actualPrice}</div>
            )}
           
           </div>
        </div>
        </Link>
    )
}

export default Products
