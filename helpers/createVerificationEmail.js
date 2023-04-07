const { BASE_URL } = process.env;

const createVerificationEmail = (email, verificationToken) => {
  const mail = {
    to: email,
    subject: "Verification of email",
    html: `<a href='${BASE_URL}/api/auth/verify/${verificationToken}'>Click here to verify your email</a>`,
  };
  return mail;
};

module.exports = createVerificationEmail;
