/**
 * controller file for handling the req and response
 */
const logger = require('../../helpers/logEvents');
const { StatusCodes } = require('http-status-codes');
const {
  registerUser, sendOtp, otpVerification, sendOtpCall, loginUser,
  forgetPassword, resetPassword, verifyQrService, TokenVerify, logoutService, getAllUsers,
} = require('./users.service');

/**
 * controller function to register the user ...
 */
async function register(req, res) {
  try {
    const registeredUser = await registerUser(req);
    logger.info(`${StatusCodes.CREATED} Method: ${req.method}=====${req.url}=====User hase been registered `);
    return res.status(StatusCodes.CREATED).json({
      message: 'User hase been registered',
      userInfo: { ...registeredUser },
    });
  } catch (error) {
    if (error.isOperational) {
      logger.error(`${error} Method: ${req.method}=====${req.url}=====${error.description} `);
      return res.status(error.httpCode).json({
        message: error.description,
      });
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
}

async function otp(req, res) {
  try {
    const otpStatus = await sendOtp(req);
    logger.info(`${StatusCodes.CREATED} Method: ${req.method}=====${req.url}=====otp send successfully `);
    return res.status(StatusCodes.CREATED).json({
      message: 'otp send successfully',
      status: otpStatus,
    });
  } catch (error) {
    logger.error(`${error} Method: ${req.method}=====${req.url}=====${error.message} `);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
}

async function otpCall(req, res) {
  try {
    const otpStatus = await sendOtpCall(req);
    logger.info(`${StatusCodes.CREATED} Method: ${req.method}=====${req.url}=====otp send successfully `);
    return res.status(StatusCodes.CREATED).json({
      message: 'otp send successfully',
      status: otpStatus,
    });
  } catch (error) {
    logger.error(`${error} Method: ${req.method}=====${req.url}=====${error.message} `);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
}

async function verifyOtp(req, res) {
  try {
    const otpVerify = await otpVerification(req.params.userId, req);
    logger.info(`${StatusCodes.CREATED} Method: ${req.method}=====${req.url}=====otp verified successfully `);
    return res.status(StatusCodes.CREATED).json({
      message: 'otp verified successfully',
      ...otpVerify,
    });
  } catch (error) {
    logger.error(`${error} Method: ${req.method}=====${req.url}=====${error.description} `);
    if (error.isOperational) {
      return res.status(error.httpCode).json({
        message: error.description,
      });
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
}

async function login(req, res) {
  try {
    const data = await loginUser(req);
    logger.info(`${StatusCodes.OK} Method: ${req.method}=====${req.url}=====User Login successfully `);
    return res.status(StatusCodes.OK).json({
      data,
    });
  } catch (error) {
    logger.error(`${error} Method: ${req.method}=====${req.url}=====${error.description} `);
    if (error.isOperational) {
      return res.status(error.httpCode).json({
        message: error.description,
      });
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
}

async function ForgetPassword(req, res) {
  try {
    const data = await forgetPassword(req);
    logger.info(`${StatusCodes.OK} Method: ${req.method}=====${req.url}=====Please check your Email. `);
    return res.status(StatusCodes.OK).json({
      message: 'Please check your Email.',
      status: data,
    });
  } catch (error) {
    logger.error(`${error} Method: ${req.method}=====${req.url}=====${error.message} `);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
}

async function ResetPassword(req, res) {
  try {
    const data = await resetPassword(req.params.token, req);
    logger.info(`${StatusCodes.OK} Method: ${req.method}=====${req.url}=====Your Password Updated!. `);
    return res.status(StatusCodes.OK).json({
      message: 'Your Password Updated!',
      Data: data,
    });
  } catch (error) {
    logger.error(`${error} Method: ${req.method}=====${req.url}=====${error.message} `);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
}

const allUsersController = async (req, res) => {
  try {
    const allUsers = await getAllUsers();
    logger.info(`${StatusCodes.OK} Method: ${req.method}=====${req.url}=====Users Found Successfully. `);
    return res.status(StatusCodes.OK).json({
      message: 'Users Found Successfully.',
      beneficiaryInfo: allUsers,
    });
  } catch (error) {
    logger.error(`${error} Method: ${req.method}=====${req.url}=====${error.description} `);
    if (error.isOperational) {
      return res.status(error.httpCode).json({
        message: error.description,
      });
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
};

async function verifyToken(req, res) {
  try {
    const data = await TokenVerify(req.params.token);
    logger.info(`${StatusCodes.OK} Method: ${req.method}=====${req.url}=====Token Verified Successfully. `);
    return res.status(StatusCodes.OK).json({
      message: 'Token Verified Successfully',
      Data: data,
    });
  } catch (error) {
    logger.error(`${error} Method: ${req.method}=====${req.url}=====${error.message} `);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
}

async function verifyQr(req, res) {
  try {
    const data = await verifyQrService(req);
    logger.info(`${StatusCodes.OK} Method: ${req.method}=====${req.url}=====QR code Verified. `);
    return res.status(StatusCodes.OK).json({
      message: 'QR code Verified',
      data,
    });
  } catch (error) {
    logger.error(`${error} Method: ${req.method}=====${req.url}=====${error.description} `);
    if (error.isOperational) {
      return res.status(error.httpCode).json({
        message: error.description,
      });
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
}

async function logout(req, res) {
  try {
    const data = await logoutService(req.params.token);
    logger.info(`${StatusCodes.OK} Method: ${req.method}=====${req.url}=====User Logout successfully. `);
    return res.status(StatusCodes.OK).json({
      message: 'User Logout successfully.',
      data,
    });
  } catch (error) {
    logger.error(`${error} Method: ${req.method}=====${req.url}=====${error.description} `);
    if (error.isOperational) {
      return res.status(error.httpCode).json({
        message: error.description,
      });
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
}

module.exports = {
  register,
  otp,
  otpCall,
  verifyOtp,
  login,
  ForgetPassword,
  ResetPassword,
  verifyQr,
  verifyToken,
  logout,
  allUsersController,
};
