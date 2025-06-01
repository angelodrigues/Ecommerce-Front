import { BrowserRouter, Routes, Route } from "react-router";
import Navbar from "../components/navbar/navbar";
import Auth from "../pages/auth/auth";
import Home from "../pages/home/home";
import Login from "../pages/auth/login/login";
import Register from "../pages/auth/register/register";
import AuthCheck from "../authCheck/authCheck";
import Error from "../pages/error/error";
import ProductPage from "../pages/product/product";
import ManagementProduct from "../pages/product/management/managementProduct";
import { User } from "../pages/user";
import { Cart } from "../pages/cart";
import Checkout from "../pages/cart/checkout/Checkout";

export default function Main() {
  return (
    <div>
        <BrowserRouter>
           {/*navbar*/}
           <Navbar />
           <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/product' element={<ProductPage />} />
              <Route path='/product/management' element={<ManagementProduct />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/checkout' element={<Checkout />} />
              <Route path='/auth' element={<Auth />} >
                <Route path='login' element={<Login />} />
                <Route path='register' element={<Register />} />
                <Route path='user' element={
                  <AuthCheck>
                    <User />
                  </AuthCheck>
                } />
              </Route>
              <Route path='/error' element={<Error />} />
              <Route path='*' element={<Error />} />
           </Routes>
        </BrowserRouter>
    </div>
  );
};