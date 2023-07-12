import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import NotFound from "./Pages/NotFound/NotFound";
import Login from "./Pages/Login/Login/Login";
import Register from "./Pages/Login/Register/Register";
import Dashboard from "./Pages/Dashboard/Dashboard";
import PrivateRoute from "./Pages/Login/PrivateRoute/PrivateRoute";
import AuthProvider from "./contexts/AuthProvider/AuthProvider";
import GoogleRegister from "./Pages/Login/GoogleRegister/GoogleRegister";
import VenueDetails from "./Pages/Dashboard/Components/CustomerComponets/VenueDetails";
import AboutUs from "./Pages/AboutUs/AboutUs";
import ContactUs from "./Pages/ContactUs/ContactUs";
import Venues from "./Pages/Dashboard/Components/CustomerComponets/Venues";
import CustomerDashboard from "./Pages/Dashboard/Components/CustomerComponets/CustomerDashboard";
import VenueOwnerDetails from "./Pages/Dashboard/Components/OwnerComponents/VenueOwnerDetails";
import PaymentSuccess from "./Pages/Dashboard/Components/CustomerComponets/PaymentSuccess";

function App() {
  return (
    <div>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/home" element={<Home />}> </Route>
            <Route path="/aboutus" element={<AboutUs />}> </Route>
            <Route path="/contactus" element={<ContactUs />}> </Route>
            <Route path="/venues" element={<PrivateRoute><Venues /></PrivateRoute>}> </Route>
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>}> </Route>
            <Route path="/customerdashboard" element={<PrivateRoute><CustomerDashboard /></PrivateRoute>}> </Route>
            <Route path="/login" element={<Login />}> </Route>
            <Route path="/register" element={<Register />}> </Route>
            <Route path="/googleRegister" element={<PrivateRoute><GoogleRegister /></PrivateRoute>}> </Route>
            <Route path="/venueDetails/:venueTitle" element={<PrivateRoute><VenueDetails /></PrivateRoute>}></Route>
            <Route path="/venueOwnerDetails/:venueTitle" element={<PrivateRoute><VenueOwnerDetails /></PrivateRoute>}></Route>
            <Route path="/success/:id" element={<PrivateRoute><PaymentSuccess /></PrivateRoute>}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
