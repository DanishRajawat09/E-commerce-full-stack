

import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Home from './pages/HomePage/Home'
import Layout from './pages/Layout/Layout'
import ProductDetails from "./pages/ProductDetailsPage/ProductDetails"
import CasualPage from "./pages/shop/casualPage/CasualPage"
import Cart from './pages/CartPage/Cart'
import ScrollToTop from "./components/ScrollToTop";
// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path='/' element={<Layout/>}>
//       <Route path='' element={<Home/>}></Route>
//       <Route path='/productDetails' element={<ProductDetails/>}></Route>
//       <Route path='/shop' element={<CasualPage/>}></Route>
//       <Route path='/cart' element={<Cart/>}></Route>
//     </Route>
//   )
// )
function App() {
  return (
    <BrowserRouter>
      {/* ⬅️ This is important: Wrap ScrollToTop inside BrowserRouter */}
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="productDetails" element={<ProductDetails />} />
          <Route path="shop" element={<CasualPage />} />
          <Route path="cart" element={<Cart />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App
