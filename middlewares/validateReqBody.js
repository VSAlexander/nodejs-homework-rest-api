const { handleRequestError } = require("../helpers");

const validateReqBody = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    next(handleRequestError(400, error.details[0].message));
  }
};

module.exports = validateReqBody;
