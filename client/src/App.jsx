import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Dashboard from "./pages/Dashboard";
import VerifyOTP from "./pages/VerifyOTP";
import ProtectedRoute from "./pages/ProtectedRoute";
import UnathenticatedRoute from "./components/UnathenticatedRoute";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<UnathenticatedRoute />}>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        {/* <Route element={<ProtectedRoute requireEmail={true} />}> */}
          <Route path="/verify" element={<VerifyOTP />} />
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
