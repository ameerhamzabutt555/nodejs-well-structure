const express = require('express');

const router = express.Router();

const userRouter = require('../components/users/users.api');
const ActivateUserRouter = require('../components/linked_users/linkedUser.api');
const beneficiaryRouter = require('../components/beneficiary/beneficiary.api');
const paymentRouter = require('../components/payment/payment.api');
const fxQuotes = require('../components/fx_quotes/fxQuotes.api');

router.use('/user', userRouter);
router.use('/beneficiary', beneficiaryRouter);
router.use('/payment', paymentRouter);
router.use('/fxQuotes', fxQuotes);
router.use('/activeUser', ActivateUserRouter);

module.exports = router;
