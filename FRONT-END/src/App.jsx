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
import UserRegister from "./pages/register/userRegister/UserRegister.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";

import ForgetPassword from "./pages/forgetPassword/ForgetPassword.jsx";
import NewPassword from "./components/newPassword/NewPassword.jsx";
import Profile from "./pages/profilePage/Profile.jsx";
import Address from "./pages/address/Address.jsx";
import VerifyOtp from "./components/verifyOtp/VerifyOtp.jsx";

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

        <Route path="/user/login" element={<UserLogin role="user"/>} />
        <Route path="/admin/login" element={<UserLogin role="admin" />} />
        <Route path="/admin/signup" element={<UserRegister role="admin" />} />
        <Route path="/user/signup" element={<UserRegister role="user" />} />
        <Route path="/user/forgetpassword" element={<ForgetPassword role="user" />} />
        <Route path="/admin/forgetpassword" element={<ForgetPassword role="admin"/>} />


        <Route path="/user/verifyotp" element={<VerifyOtp role="user"/>} />
        <Route path="/admin/verifyotp" element={<VerifyOtp role="admin"/>} />
        <Route path="/user/newpassword" element={<NewPassword role="user"/>} />
        <Route path="/admin/newpassword" element={<NewPassword role="admin"/>} />
        <Route path="/admin/profile" element={<Profile role="admin"/>} />
        <Route path="/user/profile" element={<Profile role="user"/>} />
        <Route path="/user/address" element={<Address role="user"/>} />
        <Route path="/admin/address" element={<Address role="admin"/>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
