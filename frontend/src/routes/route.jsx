import{Routes, Route} from "react-router-dom";
import Auth from "../Pages/Auth";
import Profile from "../Pages/Profile"; 

const MyRoutes = () => {
  return (
    <Routes>
      <Route path="/auth" element={<Auth/>} />
      <Route path="/Profile" element={<Profile/>} />
    </Routes>
  );
};

export default MyRoutes;