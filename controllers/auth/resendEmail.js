const User = require("../../models/user");
const {
  handleRequestError,
  sendEmail,
  createVerificationEmail,
} = require("../../helpers");

const resendEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw handleRequestError(404, "User not found");
  }
  if (user.verify) {
    throw handleRequestError(400, "Verification has already been passed");
  }

  const mail = createVerificationEmail(email, user.verificationToken);

  await sendEmail(mail);

  res.status(200).json({
    message: "Verification email has been sent",
  });
};

module.exports = resendEmail;
