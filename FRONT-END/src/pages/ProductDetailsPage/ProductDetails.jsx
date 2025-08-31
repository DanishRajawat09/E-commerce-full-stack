
import ProductDetailsData from "../../components/productDetailsPageComp/productsDetailData/ProductDetailsData"
import { productsPageData } from '../../api/HomePageProducts'
import ProductInfo from "../../components/productDetailsPageComp/productInformation/ProductInfo"
const ProductPage = () => {

  return (
    <>
   <ProductDetailsData data={productsPageData} />
   <ProductInfo/>
    </>
    
  )
}

export default ProductPage
