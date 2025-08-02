import{Routes, Route} from "react-router-dom";
import Auth from "../Pages/Auth";
import Profile from "../Pages/Profile"; 
import AddProduct from "../Pages/AddProduct"; 

const MyRoutes = () => {
  return (
    <Routes>
      <Route path="/auth" element={<Auth/>} />
      <Route path="/profile" element={<Profile/>} />
      <Route path="/addproduct" element={<AddProduct/>} />
    </Routes>
  );
};

export default MyRoutes;