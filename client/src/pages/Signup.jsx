import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import { registerUser } from "../api/auth";

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await registerUser(form);
      alert("OTP code sent! Check your email");
      navigate("/verify", {state: {email: form.email}});
    } catch (err) {
      console.error("Signup failed: ", err.response?.data?.message || err.message);
      alert("Signup failed. Try again");
    }
  };

  return (
    <div className="flex justify-center items-center w-full min-h-screen bg-[#FFFFFF]">
      <div className="flex flex-col items-center border border-[#1E6A6E] p-5 m-5 rounded-md shadow-md">
        <h1 className="font-bold text-xl mb-4 text-[#1E6A6E]">REGISTER</h1>
        <form className="flex flex-col" onSubmit={handleSignup}>
          <Input placeholder="Enter your email" name="email" type="email" onChange={handleChange} />
          <Input placeholder="Enter your preferred username" name="username" type="text" onChange={handleChange} />
          <Input placeholder="Enter your password" name="password" type="password" onChange={handleChange} />
          <Button text="Register" />
        </form>
        <p className="text-[#6B7280] text-sm">
          Already have an account? <Link to={'/'} className="text-[#1E6A6E] hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;