import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import { registerUser } from "../api/auth";

const Signup = () => {
  //Hook to navigate between routes
  const navigate = useNavigate();

  //initial form state
  const [form, setForm] = useState({
    email: "",
    username: "",
    password: "",
  });

  //handles change in form inputs
  const handleChange = (e) => {
    setForm({...form, [e.target.name]:e.target.value})
  }

  const handleSignup = async (e) => {
    e.preventDefault();
    try{
      await registerUser(form); //calls the API to register the user
      alert("Registration successful! Please login.");
      navigate("/");
    } catch(err) {
      console.log(form);
      
      console.error("Signup failed: ", err.response?.data?.message || err.message);
      alert("Signup failed. Try again");
    }
    
  }

    return(
         
    <div className="flex justify-center items-center w-full min-h-screen bg-gray-50">
      <div className="flex flex-col items-center border border-orange-400 p-5 m-5 rounded-md shadow-md">
        <h1 className="font-bold text-xl mb-4">REGISTER</h1>
        <form className="flex flex-col" onSubmit={handleSignup}>
          <Input placeholder="Enter your email" name="email" type="email" onChange={handleChange} />
          <Input placeholder="Enter your preferred username" name="username" type="text" onChange={handleChange} />
          <Input placeholder="Enter your password" name="password" type="password" onChange={handleChange} />
          <Button text="Register" />
        </form>
        <p className="text-gray-400 text-sm">Already have an account? <Link to={'/'} className="text-orange-500">Login</Link></p>
      </div>
    </div>
  );
};

    

export default Signup;