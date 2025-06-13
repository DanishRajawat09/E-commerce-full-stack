import React from 'react'
import ProductDetailsData from "../ProductDetailsPage/productDetailsPageComp/productsDetailData/ProductDetailsData"
import { productsPageData } from '../../api/HomePageProducts'
import ProductInfo from "../ProductDetailsPage/productDetailsPageComp/productInformation/ProductInfo"
const ProductPage = () => {

  return (
    <>
   <ProductDetailsData data={productsPageData} />
   <ProductInfo/>
    </>
    
  )
}

export default ProductPage
