import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import NotFound from "./Pages/NotFound/NotFound";
import Login from "./Pages/Login/Login/Login";
import Register from "./Pages/Login/Register/Register";
import Dashboard from "./Pages/Dashboard/Dashboard";
import PrivateRoute from "./Pages/Login/PrivateRoute/PrivateRoute";
import AuthProvider from "./contexts/AuthProvider/AuthProvider";
import GoogleRegister from "./Pages/Login/GoogleRegister/GoogleRegister";

function App() {
  return (
    <div>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/home" element={<Home />}> </Route>
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>}> </Route>
            <Route path="/login" element={<Login />}> </Route>
            <Route path="/register" element={<Register />}> </Route>
            <Route path="/googleRegister" element={<PrivateRoute><GoogleRegister /></PrivateRoute>}> </Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
