import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import DesktopHeader from "./components/DesktopHeader";
import Test from "./components/Test";
import Search from "./pages/Search";
import SingleProduct from "./pages/SingleProduct";
import Cart from "./pages/Cart";
import Auth from "./pages/Auth";
import Products from "./pages/Products";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import { Navigate } from "react-router-dom";

export default function App() {
  const isMobile = window.innerWidth < 768;

  const user = JSON.parse(localStorage.getItem("user"));
  
  // const user = { isAdmin: true };

  return (
    <div>
      {isMobile ? <Header /> : <DesktopHeader />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/cart" element={<Cart />} />
        {/* <Route element={<ProtectedRoute />}> */}
        <Route path="/auth" element={<Auth />} />
        <Route path="/reset-password" element={<Auth />} /> // For token links
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} /> {/* </Route>  */}

        <Route
          path="/admin"
          element={user?.role === "admin" ? <Admin /> : <Navigate to="/" />}
        />

        <Route path="/products" element={<Products />} />
        <Route path="/product/:slug/:id" element={<SingleProduct />} />
        <Route
          path="*"
          element={<h1 className="text-center p-5">404 Not Found</h1>}
        />
        <Route path="/test" element={<Test />} />
      </Routes>
    </div>
  );
}
