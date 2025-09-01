
import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import Home from './pages/Home'
import MainLayout from './layout/MainLayout'

function App() {


  return (

          <BrowserRouter>
      {/* ⬅️ This is important: Wrap ScrollToTop inside BrowserRouter */}
      {/* <ScrollToTop /> */}

      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          {/* <Route path="productDetails" element={<ProductDetails />} />
          <Route path="shop" element={<CasualPage />} />
          <Route path="cart" element={<Cart />} /> */}
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
