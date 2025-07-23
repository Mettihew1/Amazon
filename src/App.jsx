import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import DesktopHeader from "./components/DesktopHeader";
import Test from "./components/Test";
import Search from "./pages/Search";
import Footer from "./components/Footer";

import SingleProduct from "./pages/SingleProduct";
import Cart from "./pages/Cart";
import Products from "./pages/Products";
import Login from "./pages/auth/Login";
import Logout from "./pages/auth/Logout";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Register from "./pages/auth/Register";
import Profile from "./pages/auth/Profile";
import Dashboard from "./pages/auth/Dashboard";
import Admin from "./pages/Admin";
import { Navigate } from "react-router-dom";

export default function App() {
  // const isMobile = window.innerWidth < 768;

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
      {/* {isMobile ? <Header /> : <DesktopHeader />} */}
       <Header /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/profile" element={<Profile />} /> {/* </Route>  */}
        <Route path="/dashboard" element={<Dashboard />} /> {/* </Route>  */}

        <Route
          path="/admin"
          element={user?.role === "admin" ? <Admin /> : <Navigate to="/" />}
        />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:slug/:id" element={<SingleProduct />} />
        <Route
          path="*"
          element={<h1 className="text-center p-5">404 Not Found</h1>}
        />
        <Route path="/test" element={<Test />} />
        <Route path="/footer" element={<Footer />} />

      </Routes>
    </div>
  );
}
