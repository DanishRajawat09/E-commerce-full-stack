import {
  BrowserRouter,
  // createBrowserRouter,
  // createRoutesFromElements,
  Route,
  // RouterProvider,
  Routes,
} from "react-router-dom";
import "./App.css";
import Home from "./pages/HomePage/Home";
import Layout from "./pages/Layout/Layout";
import ProductDetails from "./pages/ProductDetailsPage/ProductDetails";
import CasualPage from "./pages/shop/casualPage/CasualPage";
import Cart from "./pages/CartPage/Cart";
import UserLogin from "./pages/login/UserLogin/UserLogin";
import AdminLogin from "./pages/login/AdminLogin/AdminLogin";
import UserRegister from "./pages/register/userRegister/UserRegister.jsx";
import AdminRegister from "./pages/register/adminRegister/adminRegister.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import OtpInput from "./pages/verifyOtp/VerifyOtp.jsx";

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <>
//     <ScrollToTop/>
//       <Route path="/" element={<Layout />}>
//         <Route path="" element={<Home />}></Route>
//         <Route path="/productDetails" element={<ProductDetails />}></Route>
//         <Route path="/shop" element={<CasualPage />}></Route>
//         <Route path="/cart" element={<Cart />}></Route>
//       </Route>
//       <Route path="/userlogin" element={<UserLogin />}></Route>
//       <Route path="/adminLlogin" element={<AdminLogin/>}></Route>
//       <Route path="/adminsignup" element={<AdminRegister/>}></Route>
//       <Route path="/usersignup" element={<UserRegister />}></Route>
//     </>
//   )
// );
function App() {
  return (
    <BrowserRouter>
     
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="productDetails" element={<ProductDetails />} />
          <Route path="shop" element={<CasualPage />} />
          <Route path="cart" element={<Cart />} />
        </Route>

        <Route path="/userlogin" element={<UserLogin />} />
        <Route path="/adminLlogin" element={<AdminLogin />} />
        <Route path="/adminsignup" element={<AdminRegister />} />
        <Route path="/usersignup" element={<UserRegister />} />
        <Route path="/otppage" element={<OtpInput />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
