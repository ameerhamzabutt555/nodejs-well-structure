/* eslint-disable global-require */
/* eslint-disable no-console */
const { StatusCodes } = require('http-status-codes');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { AppError } = require('../../utils/errorHandler');
const { dataAccessLayer } = require('../access_layer/DAL');
const { SALT_ROUNDS } = require('../../constants/contants');
const { Logging } = require('../../utils/logging');
const nodemailer = require('nodemailer');
/**
 * below is the twillio imports/configuration
 */
const {
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_SERVICE_SID,
  ACCESS_TOKEN_SECRET,
} = require('../../utils/config');
const User = require('../../models/user.model');
// const COMPANY = require('../../models/companies.model');
const ERROR_MSG = require('./users.error');
const speakeasy = require('speakeasy');
const qrcode = require('qrcode');
const Company = require('../../models/companies.model');
/**
 * this will contain the business logic of the application
 */

async function generateSecret(email, userInfo) {
  const secret = speakeasy.generateSecret({
    length: 20,
    name: `${email} One-Way-Money`,
  });
  await dataAccessLayer(User).findOneAndUpdate(
    { _id: userInfo._id },
    { $set: { verified: true, key: secret.ascii } },
  );
  const qr = await qrcode.toDataURL(secret.otpauth_url);
  if (qr) {
    return { qr, verified: userInfo.verified };
  }
  throw new AppError(StatusCodes.NOT_FOUND, ERROR_MSG.NOT_FOUND, true);
}

async function registerUser(data) {
  const { body } = data;
  body.password = await bcrypt.hash(body.password, SALT_ROUNDS);
  const checkRegistered = await dataAccessLayer(User).findOne({
    $or: [
      { email: body.email },
      { phoneNo: body.phoneNo },
    ],
  });
  if (!checkRegistered) {
    // we will register a new user
    const companyData = {
      companyName: body.companyName,
      companyAddress: body.companyAddress,
    };
    let userData = {
      email: body.email,
      phoneNo: body.phoneNo,
      password: body.password,
      firstName: body.firstName,
      lastName: body.lastName,
    };

    const registeredComp = await dataAccessLayer(Company).create(companyData);
    if (registeredComp) {
      userData = {
        ...userData,
        companyID: registeredComp._id,
      };
      const registeredUser = await dataAccessLayer(User).create(userData);
      const userInfo = {
        companyName: registeredComp.companyName,
        companyAddress: registeredComp.companyAddress,
        companyID: registeredComp._id.toString(),
        email: registeredUser.email,
        phoneNo: registeredUser.phoneNo,
        verified: registeredUser.verified,
        firstName: registeredUser.firstName,
        lastName: registeredUser.lastName,
        userID: registeredUser._id.toString(),
      };
      return userInfo;
    }
  }
  throw new AppError(StatusCodes.CONFLICT, ERROR_MSG.ALREADY_REGISTERED, true);
}

async function sendOtp(data) {
  const client = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
  const { body } = data;
  const otp = await client.verify.v2
    .services(TWILIO_SERVICE_SID)
    .verifications.create({ to: body.phoneNo, channel: 'sms' });
  return otp.status;
}

async function getAllUsers() {
  const checkUsers = await dataAccessLayer(User).find();
  if (checkUsers !== null) {
    return checkUsers;
  }
  throw new AppError(StatusCodes.NOT_FOUND, ERROR_MSG.NOT_FOUND, true);
}

async function sendOtpCall(data) {
  const client = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
  const { body } = data;
  const otp = await client.verify.v2
    .services(TWILIO_SERVICE_SID)
    .verifications.create({ to: body.phoneNo, channel: 'call' });
  return otp.status;
}

async function otpVerification(userId, data) {
  const client = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
  const { body } = data;
  const user = await dataAccessLayer(User).findById(userId);
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, ERROR_MSG.NOT_FOUND, true);
  }
  const otpVerify = await client.verify.v2
    .services(TWILIO_SERVICE_SID)
    .verificationChecks.create({ to: body.phoneNo, code: body.otp });
  /**
   * if otp is verified we will set the verify true for the user
   */
  const updatedUser = await dataAccessLayer(User).findByIdAndUpdate(userId, {
    verified: true,
    updatedAt: new Date(),
  });
  const userInfo = {
    companyName: updatedUser.companyName,
    companyAddress: updatedUser.companyAddress,
    email: updatedUser.email,
    phoneNo: updatedUser.phoneNo,
    verified: updatedUser.verified,
    _id: updatedUser._id,
  };
  return { otpVerifyStatus: otpVerify.status, userInfo: { ...userInfo } };
}

async function loginUser(data) {
  const { body } = data;
  let userInfo;
  if (body.email) {
    userInfo = await dataAccessLayer(User).findOne({ email: body.email });
  } else if (body.phoneNo) {
    userInfo = await dataAccessLayer(User).findOne({ phoneNo: body.phoneNo });
  }
  await Logging(data, 'Login Module', 'Login', userInfo._id, userInfo.email);
  if (userInfo) {
    if (userInfo.verified && userInfo.key) {
      const passwordCheck = await bcrypt.compare(
        body.password,
        userInfo.password,
      );
      if (passwordCheck) {
        // creating a access token
        return { googleAuthFlag: true };
      }
      throw new AppError(
        StatusCodes.CONFLICT,
        ERROR_MSG.INVALID_PASSWORD,
        true,
      );
    } else {
      // throw new AppError(StatusCodes.CONFLICT, ERROR_MSG.OTP_VERIFICATION, true);
      const secret = await generateSecret(body.email, userInfo);
      return secret;
    }
  } else {
    throw new AppError(StatusCodes.NOT_FOUND, ERROR_MSG.NOT_FOUND, true);
  }
}

async function forgetPassword(data) {
  const { body } = data;
  const userInfo = await dataAccessLayer(User).findOne({ email: body.email });
  if (userInfo) {
    // creating a access token
    const accessToken = jwt.sign(
      {
        userId: userInfo._id,
      },
      ACCESS_TOKEN_SECRET,
      {
        expiresIn: '30m',
      },
    );
    const mailTransporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      auth: {
        user: 'rakhshanmughalthd@gmail.com',
        pass: 'rzozgtnnpibqxcck',
      },
    });

    const message = {
      from: 'rakhshanmughalthd@gmail.com', // sender address

      to: body.email, // list of receivers

      subject: 'Reset Link',

      html: `<h2>Click Here for Reset Your Password</h2>

      <a href="http://localhost:3001/resetPassword/${accessToken}">Click here to reset password</a>

              `,
    };

    mailTransporter.sendMail(message, async (err, info) => {
      if (err) {
        console.log('Error Occurs', err);
      } else {
        // eslint-disable-next-line no-console
        console.log('Email sent successfully');
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      }
    });

    return { Success: StatusCodes.ACCEPTED };
  }
  return null;
}

async function resetPassword(token, data) {
  const { body } = data;
  const verification = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  if (verification) {
    const updatedPassword = await dataAccessLayer(User).findByIdAndUpdate(
      verification.userId,
      {
        password: await bcrypt.hash(body.password, SALT_ROUNDS),
        updatedAt: new Date(),
      },
    );
    return updatedPassword;
  }
  return null;
}

async function TokenVerify(token) {
  const verification = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  if (verification) {
    return { Success: StatusCodes.ACCEPTED };
  }
  return null;
}

async function verifyQrService(data) {
  const { body } = data;
  const userInfo = await dataAccessLayer(User).findOne({ email: body.email });
  if (!userInfo) {
    throw new AppError(StatusCodes.NOT_FOUND, ERROR_MSG.NOT_FOUND, true);
  }

  const verified = speakeasy.time.verify({
    secret: userInfo.key,
    encoding: 'ascii',
    token: body.token,
  });

  if (!verified) {
    /**
     * TODO: the jwt token will expire in 30 minutes so we need to setup the
     * refresh token token logic in a secure way for good user experience
     */
    const accessToken = jwt.sign(
      {
        userId: userInfo._id,
      },
      ACCESS_TOKEN_SECRET,
      {
        expiresIn: '1d',
      },
    );

    await dataAccessLayer(User).findOneAndUpdate(
      { _id: userInfo._id },
      { $set: { token: accessToken } },
    );

    return { accessToken, user: userInfo };
  }
  throw new AppError(StatusCodes.CONFLICT, ERROR_MSG.TWO_FA_NOT_VERIFIED, true);
}

async function logoutService(token) {
  const userInfo = await dataAccessLayer(User).findOne({ token });
  if (!userInfo) {
    throw new AppError(StatusCodes.NOT_FOUND, ERROR_MSG.NOT_FOUND, true);
  }

  await dataAccessLayer(User).findOneAndUpdate(
    { _id: userInfo._id },
    { $set: { token: '' } },
  );
  return '';
}

module.exports = {
  registerUser,
  sendOtp,
  sendOtpCall,
  otpVerification,
  loginUser,
  forgetPassword,
  resetPassword,
  verifyQrService,
  TokenVerify,
  logoutService,
  getAllUsers,
};
