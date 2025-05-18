const { sendEmail } = require("./emailUtil");

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); //generates a 6 digit OTP
};

const sendOTP = async (email) => {
  const otp = generateOTP();
  await sendEmail(
    email,
    "Verify your VMS account",
    `Your OTP is ${otp}. It expires in 20 minutes`
  );
  return otp;
};

module.exports = { generateOTP, sendOTP };
