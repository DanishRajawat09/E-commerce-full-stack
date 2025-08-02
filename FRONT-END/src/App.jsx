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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ForgetPassword from "./pages/forgetPassword/ForgetPassword.jsx";
import NewPassword from "./components/newPassword/NewPassword.jsx";
import Profile from "./pages/profilePage/Profile.jsx";
import Address from "./pages/address/Address.jsx";
import VerifyOtp from "./components/verifyOtp/VerifyOtp.jsx";
import ResetRouteProtect from "./components/resetProtect/ResetRouteProtect.jsx";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./store/store.js";
import ProtectedRoute from "./components/protactedRoute/ProtectedRoute.jsx";
import SnackBar from "./components/SnackBar.jsx";
// import { useEffect } from "react";
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

const client = new QueryClient();

function AppWrapper() {
  return (
    <PersistGate loading={<div>loading...</div>} persistor={persistor}>
      <QueryClientProvider client={client}>
        <App />
      </QueryClientProvider>
    </PersistGate>
  );
}
function App() {
  return (
    <>
      <SnackBar />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* ---------- Public Routes ---------- */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="productDetails" element={<ProductDetails />} />
            <Route element={<ProtectedRoute />}>
              <Route path="shop" element={<CasualPage />} />
            </Route>
            <Route path="cart" element={<Cart />} />
          </Route>

          {/* ---------- Auth Routes ---------- */}
          <Route path="/user/login" element={<UserLogin role="user" />} />
          <Route path="/admin/login" element={<UserLogin role="admin" />} />
          <Route path="/user/signup" element={<UserRegister role="user" />} />
          <Route path="/admin/signup" element={<UserRegister role="admin" />} />
          <Route
            path="/user/forgetpassword"
            element={<ForgetPassword role="user" />}
          />
          <Route
            path="/admin/forgetpassword"
            element={<ForgetPassword role="admin" />}
          />

          {/* ---------- Reset Password Routes ---------- */}
          <Route
            path="/user/new/password"
            element={
              <ResetRouteProtect
                role="user"
                expectedPurpose="resetPasswordVerify"
                redirectPath="/"
              />
            }
          >
            <Route index element={<NewPassword role="user" />} />
          </Route>

          <Route
            path="/admin/new/password"
            element={
              <ResetRouteProtect
                role="admin"
                expectedPurpose="resetAdminPasswordVerify"
                redirectPath="/"
              />
            }
          >
            <Route index element={<NewPassword role="admin" />} />
          </Route>

          {/* ---------- Profile Routes ---------- */}
          <Route path="/admin/profile" element={<ProtectedRoute />}>
            <Route index element={<Profile role="admin" />} />
          </Route>

          <Route
            path="/user/profile"
            element={
              <ProtectedRoute>
                <Profile role="user" />
              </ProtectedRoute>
            }
          />

          {/* ---------- Address Routes ---------- */}
          <Route
            path="/user/address"
            element={
              <ProtectedRoute>
                <Address role="user" />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/address"
            element={
              <ProtectedRoute>
                <Address role="admin" />
              </ProtectedRoute>
            }
          />

          {/* ---------- OTP Verification Routes ---------- */}

          {/* Register Verification */}
          <Route
            path="/user/verifyotp"
            element={
              <ResetRouteProtect
                role="user"
                expectedPurpose="register"
                redirectPath="/"
              />
            }
          >
            <Route
              index
              element={<VerifyOtp role="user" purpose="registerverify" />}
            />
          </Route>

          <Route
            path="/admin/verifyotp"
            element={
              <ResetRouteProtect
                role="admin"
                expectedPurpose="adminRegister"
                redirectPath="/"
              />
            }
          >
            <Route
              index
              element={<VerifyOtp role="admin" purpose="registerverify" />}
            />
          </Route>

          {/* Forgot Password Verification */}
          <Route
            path="/user/forgot/password/verifyotp"
            element={
              <ResetRouteProtect
                role="user"
                expectedPurpose="resetPassword"
                redirectPath="/user/forgetpassword"
              />
            }
          >
            <Route
              index
              element={<VerifyOtp role="user" purpose="resetpasswordverify" />}
            />
          </Route>

          <Route
            path="/admin/forgot/password/verifyotp"
            element={
              <ResetRouteProtect
                role="admin"
                expectedPurpose="resetAdminPassword"
                redirectPath="/admin/forgetpassword"
              />
            }
          >
            <Route
              index
              element={<VerifyOtp role="admin" purpose="resetpasswordverify" />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default AppWrapper;
