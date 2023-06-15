import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import NotFound from "./Pages/NotFound/NotFound";
import Login from "./Pages/Login/Login/Login";
import Register from "./Pages/Login/Register/Register";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/home" element={<Home />}> </Route>
          <Route path="/login" element={<Login />}> </Route>
          <Route path="/register" element={<Register />}> </Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
