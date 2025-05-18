const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendOTP } = require("../utils/otpUtil");

let otps = {}; // temporary storage

const register = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    //is email duplicated?
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    //are inputs empty?
    if (!email || !password || !username) {
      return res
        .status(400)
        .json({ message: "Required fields should be filled in" });
    }

    //hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    //send OTP
    const otp = await sendOTP(email);
    otps[email] = { otp, password: hashedPassword, username }; //storing the otp + user data

    res.status(200).json({
      message: "OTP sent to email",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error during registration", error: error.message });
  }
};

const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // if there is no otp stored or the user gives an incorrect otp
    if (!otps[email] || otps[email].otp !== otp) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }
    // Save the user to the DB
    const { password, username } = otps[email];
    const user = await prisma.user.create({
      data: {
        email,
        password,
        username,
        role: "USER",
      },
    });

    // Clear OTP
    delete otps[email];

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error verifying OTP", error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //validate inputs
    if (!email || !password) {
      res.status(400).json({ message: "Fields should not be empty" });
    }
    //find user
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      res.status(401).json({ message: "Invalid email or password" });
    }
    //compare passwords
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      res.status(401).json({ message: "Invalid email or password" });
    }
    //generate JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    //return status and token
    res.json({ message: "Login successful", token });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error during login", error: error.message });
  }
};

module.exports = { register, verifyOTP, login };
