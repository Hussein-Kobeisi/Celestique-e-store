import{Routes, Route} from "react-router-dom";
import Auth from "../Pages/Auth";
import Products from "../Pages/ProductListingPage";


const MyRoutes = () => {
  return (
    <Routes>
      <Route path="/auth" element={<Auth/>} />
      <Route path="/products" element={<Products/>} />

    </Routes>
  );
};

export default MyRoutes;