import{Routes, Route} from "react-router-dom";
import Auth from "../Pages/Auth";
import Products from "../Pages/ProductListingPage";
import NotificationsPage from "../Pages/NotificationPage";
import CartPage from "../Pages/CartPage";
import Profile from "../Pages/Profile"; 
import AddProduct from "../Pages/AddProduct"; 
import { UserProvider } from "../components/Context/userContext";
import ViewProduct from "../Pages/ViewProduct";
import ProductsListing from "../Pages/AdminDashboard";
import CelestialCollection from "../Pages/LandingPage";

const MyRoutes = () => {
  return (
    <UserProvider>
    <Routes>
      <Route path="/auth" element={<Auth/>} />
      <Route path="/products" element={<Products/>} />
      <Route path="/notifications" element={< NotificationsPage/>} />
      <Route path="/cart" element={<CartPage/>} />
      <Route path="/profile" element={<Profile/>} />
      <Route path="/addproduct" element={<AddProduct/>} />
      <Route path="/viewproduct" element={<ViewProduct/>} />
      {/* <Route path="/viewproduct/:productId" element={<ViewProduct />} /> */}
      <Route path="/admindashboard" element={<ProductsListing/>} />
      <Route path="/" element={<CelestialCollection/>} />
    </Routes>
    </UserProvider>

  );
};


export default MyRoutes;