import{Routes, Route} from "react-router-dom";
import Auth from "../Pages/Auth";
import Products from "../Pages/ProductListingPage";
import NotificationsPage from "../Pages/NotificationPage";
import CartPage from "../Pages/CartPage";


const MyRoutes = () => {
  return (
    <Routes>
      <Route path="/auth" element={<Auth/>} />
      <Route path="/products" element={<Products/>} />
      <Route path="/notifications" element={< NotificationsPage/>} />
      <Route path="/cart" element={<CartPage/>} />

    </Routes>
  );
};

export default MyRoutes;