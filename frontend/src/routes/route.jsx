import{Routes, Route} from "react-router-dom";
import Auth from "../Pages/Auth";
import Profile from "../Pages/Profile"; 
import AddProduct from "../Pages/AddProduct"; 
import ViewProduct from "../Pages/ViewProduct";

const MyRoutes = () => {
  return (
    <Routes>
      <Route path="/auth" element={<Auth/>} />
      <Route path="/profile" element={<Profile/>} />
      <Route path="/addproduct" element={<AddProduct/>} />
      <Route path="/viewproduct" element={<ViewProduct/>} />
    </Routes>
  );
};

export default MyRoutes;