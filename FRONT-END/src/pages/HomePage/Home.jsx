

import Hero from "../../components/HomeComp/Hero/Hero"
import BrandBelt from "../../components/HomeComp/BrandBelt/BrandBelt"
// import Arrivals from "./HomeComp/new arrivlas/Arrivals"
import DressStyle from "../../components/HomeComp/dressStyle/DressStyle"
import Testimonials from "../../components/HomeComp/Testimonials/Testimonials"
// import productApi from '../../api/productApi'
const Home = () => {
  // const product = productApi.slice(0,5)
  // const prod = productApi.slice(5,10)

 
  return (
    <>
 
      <Hero/>
      <BrandBelt/>
      {/* <Arrivals heading="New Arrivals" product={product}/> */}
       {/* <Arrivals heading="Top Selling" product={prod}/> */}
      <DressStyle/>
      <Testimonials/>
     
    </>
  )
}

export default Home
