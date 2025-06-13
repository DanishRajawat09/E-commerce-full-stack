

import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import './App.css'
import Home from './pages/HomePage/Home'
import Layout from './pages/Layout/Layout'
import ProductDetails from "./pages/ProductDetailsPage/ProductDetails"
import CasualPage from "./pages/shop/casualPage/CasualPage"
import Cart from './pages/CartPage/Cart'
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
      <Route path='' element={<Home/>}></Route>
      <Route path='/productDetails' element={<ProductDetails/>}></Route>
      <Route path='/shop' element={<CasualPage/>}></Route>
      <Route path='/cart' element={<Cart/>}></Route>
    </Route>
  )
)
function App() {
  return (
   <RouterProvider router={router}/>
  )
}

export default App
