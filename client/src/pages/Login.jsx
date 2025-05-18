import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import { loginUser } from "../api/auth";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.type]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(form);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      console.error("Login failed:", err.response?.data?.message || err.message);
      alert("Login failed. Check your credentials.");
    }
  };

  return (
    <div className="flex justify-center items-center w-full min-h-screen bg-[#FFFFFF]">
      <div className="flex flex-col items-center border border-[#1E6A6E] p-5 m-5 rounded-md shadow-md">
        <h1 className="font-bold text-xl mb-4 text-[#1E6A6E]">LOGIN</h1>
        <form className="flex flex-col" onSubmit={handleLogin}>
          <Input placeholder="Enter your email" type="email" onChange={handleChange} />
          <Input placeholder="Enter your password" type="password" onChange={handleChange} />
          <Button text="Login" />
        </form>
        <p className="text-[#6B7280] text-sm">
          Don't have an account? <Link to={'/signup'} className="text-[#1E6A6E] hover:underline">Signup</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;