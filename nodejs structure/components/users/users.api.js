const express = require('express');
const {
  register, login, otp, otpCall, verifyOtp, ForgetPassword, ResetPassword, verifyQr,
  verifyToken, logout, allUsersController,
} = require('./users.controller');
const Validator = require('../../middlewares/validator');

const router = express.Router();

router.post('/register', Validator('register'), register);
router.post('/send-otp', Validator('otp'), otp);
router.post('/send-otp-voice', Validator('otp'), otpCall);
router.post('/verify-otp/:userId', Validator('otpVerify'), verifyOtp);
router.post('/login', Validator('login'), login);
router.post('/forgetPassword', ForgetPassword);
router.post('/resetPassword/:token', Validator('resetPassword'), ResetPassword);
router.get('/verify/:token', verifyToken);
router.post('/verifyQr', verifyQr);
router.get('/logout/:token', logout);
router.get('/getAllUsers', allUsersController);
module.exports = router;
