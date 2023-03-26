const { isValidObjectId } = require("mongoose");
const { handleRequestError } = require("../helpers");

const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  const result = isValidObjectId(contactId);
  if (!result) {
    throw handleRequestError(400, "Invalid id");
  }
  next();
};

module.exports = isValidId;
