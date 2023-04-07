const signup = require("./signup");
const login = require("./login");
const getCurrentUser = require("./getCurrentUser");
const logout = require("./logout");
const updateStatusUser = require("./updateStatusUser");
const updateUserAvatar = require("./updateUserAvatar");
const verify = require("./verify");
const resendEmail = require("./resendEmail");

module.exports = {
  signup,
  login,
  getCurrentUser,
  logout,
  updateStatusUser,
  updateUserAvatar,
  verify,
  resendEmail,
};
