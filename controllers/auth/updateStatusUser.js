const User = require("../../models/user");
const { handleRequestError } = require("../../helpers");

const updateStatusUser = async (req, res, next) => {
  const { _id } = req.user;
  const updatedUser = await User.findByIdAndUpdate(_id, req.body, {
    new: true,
    runValidators: true, // enable Mongoose validation
  });
  if (!updatedUser) {
    throw handleRequestError(404, "Not found");
  }

  res.status(200).json(updatedUser);
};

module.exports = updateStatusUser;
