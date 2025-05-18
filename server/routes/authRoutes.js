const express = require('express');
const {login, verifyOTP, register} = require('../controllers/authController')

const router = express.Router();

router.post("/login", login);
router.post("/verify-otp", verifyOTP);
router.post("/register", register);

module.exports = router;

