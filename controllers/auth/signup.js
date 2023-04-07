const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const { nanoid } = require("nanoid");
const User = require("../../models/user");

const {
  handleRequestError,
  sendEmail,
  createVerificationEmail,
} = require("../../helpers");

const signup = async (req, res) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw handleRequestError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = nanoid();
  const result = await User.create({
    email,
    password: hashPassword,
    subscription,
    avatarURL,
    verificationToken,
  });

  const mail = createVerificationEmail(email, verificationToken);

  await sendEmail(mail);

  res.status(201).json({
    email: result.email,
  });
};

module.exports = signup;
