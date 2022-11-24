const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const { ACCESS_TOKEN_SECRET } = require('../utils/config');

async function authenticateJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    /**
     * below will contain the logic of jwt authentication
     */
    try {
      const token = authHeader.split(' ')[1];
      const user = await jwt.verify(token, ACCESS_TOKEN_SECRET);
      const userInfo = await User.findById(user.userId);
      if (userInfo) {
        req.user = userInfo;
        return next();
      }
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid accesstoken' });
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error });
    }
  }
  return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'No access token found' });
}

module.exports = {
  authenticateJWT,
};
