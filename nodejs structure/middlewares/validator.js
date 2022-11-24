//* Include all validators
const { StatusCodes } = require('http-status-codes');
const Validators = require('../validators');

module.exports = function Validator(validator) {
  //! If validator is not exist, throw err
  if (!Validators.hasOwnProperty(validator)) { throw new Error(`'${validator}' validator does not exist`); }

  return async function Validate(req, res, next) {
    try {
      const validated = await Validators[validator].validateAsync(req.body, { abortEarly: false });
      req.body = validated;
      next();
    } catch (err) {
      //* Pass err to next
      //! If validation error occurs call next with HTTP 422. Otherwise HTTP 500
      if (err.isJoi) {
        const error = [];
        err?.details?.map((e) => {
          const obj = {};
          obj[`${e?.context?.key}`] = e.message;
          error.push(obj);
        });
        return next(res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ message: error }));
      }
      next(res.status(StatusCodes.INTERNAL_SERVER_ERROR));
    }
  };
};
