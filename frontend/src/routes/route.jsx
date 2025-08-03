import{Routes, Route} from "react-router-dom";
import Auth from "../Pages/Auth";
import Products from "../Pages/ProductListingPage";
import NotificationsPage from "../Pages/NotificationPage";


const MyRoutes = () => {
  return (
    <Routes>
      <Route path="/auth" element={<Auth/>} />
      <Route path="/products" element={<Products/>} />
      <Route path="/notifications" element={< NotificationsPage/>} />
     

    </Routes>
  );
};

export default MyRoutes;