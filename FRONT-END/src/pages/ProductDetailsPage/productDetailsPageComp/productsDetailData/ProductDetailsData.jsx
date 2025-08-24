import React, { useState } from 'react'

import "./productDetailsDataStyles.css"
import SetQuantity from '../../../../components/setquantityBar/setQuantity'
import Button from "../../../../components/button/Button"
import { addToCart , updateProduct } from '../../../../features/cartSlice'
import { useDispatch, useSelector } from 'react-redux'

const ProductData = ({data}) => {
  const [size , setSize] = useState("medium") 
  const [border , setBorder] = useState("firstImg") 
const cartProduct = useSelector(state => state.cartProduct)

 
  const productArr = useSelector((state) => state.product)
  console.log(productArr);
  const [bgBlack, setBgBlack] = useState("bgBlackMDM")

  const [bigImg, setBigImg] = useState(productArr[0].productImage[0])

  const [quantity , setQuantity] = useState(1)


  const dispatch = useDispatch()

  const checkProd = (id, cartProd) => {
    return cartProd.some((item) => item.crtProdId === id);
  };
  

    const handleAddToCart = (crtProdTitle, crtProdSize,   crtProdImg,  crtProdQuantity, crtProdId,  crtProdPrice, cartProd) => {
      const isExisting = checkProd(crtProdId, cartProd);
    
    
    
      
      if (isExisting) {
        dispatch(
          updateProduct({ crtProdId,crtProdTitle, crtProdImg, crtProdQuantity, crtProdSize, crtProdPrice })
        );
        console.log("Product updated in the cart");
      } else {
        dispatch(
          addToCart({  crtProdId,crtProdTitle, crtProdImg, crtProdQuantity, crtProdSize, crtProdPrice})
        );
        console.log("Product added to the cart");
      }
    };
    
  


  return (
    <main className='productDetails'>
      <div className="container detailsContainer grid">
        <div className="productImgArea grid">
          <div className="smallImgArea flexContainer">
            <img className={`smallImgOption ${border === "firstImg" && "firstImg"}` } onClick={(e) => { setBigImg(e.currentTarget.src); setBorder("firstImg") }} src={productArr[0].productImage[0]} alt={data.altName} />
            <img className={`smallImgOption ${border === "secondImg" && "secondImg"}` } onClick={(e) => { setBigImg(e.currentTarget.src); setBorder("secondImg") }} src={productArr[0].productImage[1]} alt={data.altName} />
            <img className={`smallImgOption ${border === "thirdImg" && "thirdImg"}` } onClick={(e) => { setBigImg(e.currentTarget.src); setBorder("thirdImg") }} src={productArr[0].productImage[2]} alt={data.altName} />
          </div>
          <div className="bigImg">
            <img className='bigImage' src={bigImg} alt={data.altName} />
            

          </div>
        </div>
        <div className="productTextData flexContainer">
          <h1 className='productTitle'>{productArr[0].productTitle}</h1>
          <div className="ratingArea flexContainer">
            <img src={productArr[0].productRatingImg} alt="stars" />
            <span className='productRating'>{data.rating}</span>
          </div>
          <div className="priceArea flexContainer">
            <p className=' ProductPrice'>${productArr[0].productPrice}</p>
            <p className='productActualPrice'>${productArr[0].productActualPrice}</p>
         
          </div>
          <p className='description'>
            {productArr[0].productDesc}
          </p>
          <hr className='horizon' />


          <h4 className='headingSelect'>Choose Size</h4>
          <div className="sizeArea flexContainer">
            <button onClick={(e) => {setBgBlack("bgBlackSM"); setSize(e.currentTarget.innerText)} } className={`sizeBtn ${bgBlack === "bgBlackSM" && "bgBlackSM"}`}>Small</button>
            <button onClick={(e) => {setBgBlack("bgBlackMDM"); setSize( e.currentTarget.innerText)}} className={`sizeBtn ${bgBlack === "bgBlackMDM" && "bgBlackMDM"}`}>Medium</button>
            <button onClick={(e) => {setBgBlack("bgBlackL") ; setSize(e.currentTarget.innerText)}} className={`sizeBtn ${bgBlack === "bgBlackL" && "bgBlackL"}`}>Large</button>
            <button onClick={(e) => {setBgBlack("bgBlackXL") ; setSize( e.currentTarget.innerText)}} className={`sizeBtn ${bgBlack === "bgBlackXL" && "bgBlackXL"}`}>X-Large</button>
          </div>
          <hr className='horizon' />
          <div className="addToCartArea flexContainer">
            <SetQuantity setQuantityProd={setQuantity} quantityProd={quantity} />
            <Button event={(e) => {handleAddToCart(productArr[0].productTitle , size , productArr[0].productImage[0],quantity , productArr[0].id , productArr[0].productPrice  , cartProduct) }} title={"Add To Cart"} classname={"addToCartBtn"} />
          </div>
        </div>

      </div>
    </main>
  )
}

export default ProductData
