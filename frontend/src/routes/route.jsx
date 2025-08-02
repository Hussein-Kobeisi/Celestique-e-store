import{Routes, Route} from "react-router-dom";
import Auth from "../Pages/Auth";


const MyRoutes = () => {
  return (
    <Routes>
      <Route path="/auth" element={<Auth/>} />
    </Routes>
  );
};

export default MyRoutes;