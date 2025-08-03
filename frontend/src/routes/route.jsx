import{Routes, Route} from "react-router-dom";
import Auth from "../Pages/Auth";
import Profile from "../Pages/Profile"; 
import AddProduct from "../Pages/AddProduct";  
import ViewProduct from "../Pages/ViewProduct";
import ProductsListing from "../Pages/AdminDashboard";

const MyRoutes = () => {
  return (
    <Routes>
      <Route path="/auth" element={<Auth/>} />
      <Route path="/profile" element={<Profile/>} />
      <Route path="/addproduct" element={<AddProduct/>} />
      <Route path="/viewproduct" element={<ViewProduct/>} />
      <Route path="/admindashboard" element={<ProductsListing/>} />
    </Routes>
  );
};

export default MyRoutes;