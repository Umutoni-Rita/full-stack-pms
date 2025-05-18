import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import { verifyOTP } from "../api/auth";
import colors from '../config/colors';

const VerifyOTP = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";
  const [otp, setOtp] = useState("");

  const handleChange = (e) => {
    setOtp(e.target.value);
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      await verifyOTP({ email, otp });
      alert("Email verified! Please login.");
      navigate("/");
    } catch (err) {
      console.error("OTP verification failed: ", err.response?.data?.message || err.message);
      alert("Invalid or expired OTP. Try again.");
    }
  };

  return (
    <div className={`flex justify-center items-center w-full min-h-screen bg-[${colors.background}]`}>
      <div className={`flex flex-col items-center border border-[${colors.primary}] p-5 m-5 rounded-md shadow-md`}>
        <h1 className={`font-bold text-xl mb-4 text-[${colors.primary}]`}>VERIFY OTP</h1>
        <p className={`text-[${colors.secondaryText}] mb-4`}>Enter the OTP sent to {email}</p>
        <form className="flex flex-col" onSubmit={handleVerify}>
          <Input placeholder="Enter OTP" name="otp" type="text" onChange={handleChange} />
          <Button text="Verify" />
        </form>
      </div>
    </div>
  );
};

export default VerifyOTP;