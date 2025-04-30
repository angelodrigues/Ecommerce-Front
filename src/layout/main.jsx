import { BrowserRouter, Routes, Route } from "react-router";
import Navbar from "../components/navbar/navbar";
import Auth from "../pages/auth/auth";
import Home from "../pages/home/home";
import Login from "../pages/auth/login/login";
import Register from "../pages/auth/register/register";
import AuthCheck from "../authCheck/authCheck";
import Error from "../pages/error/error";


export default function Main() {
  return (
    <div>
        <BrowserRouter>
           {/*navbar*/}
           <Navbar />
           <Routes>
              <Route path='/' element={
                <AuthCheck>
                  <Home />
                </AuthCheck>                
              }/>
              <Route path='/auth' element={<Auth />} >
                <Route path='login' element={<Login />} />
                <Route path='register' element={<Register />} />

              </Route>

              <Route path='*' element={<Error />} />
           </Routes>
        </BrowserRouter>
    </div>
  );
};