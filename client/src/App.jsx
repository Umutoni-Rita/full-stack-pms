import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Dashboard from "./pages/Dashboard";
import VerifyOTP from "./pages/VerifyOTP";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route  path="/" element={<Login/>}/>
        <Route  path="/signup" element={<Signup/>}/>
        <Route  path="/dashboard" element={<Dashboard/>} />
        <Route  path="/verify" element={<VerifyOTP/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
