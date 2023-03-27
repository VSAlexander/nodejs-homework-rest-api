const Contact = require("../../models/contact");

const getAll = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 5, ...filter } = req.query;
  const skip = (page - 1) * limit;
  const contacts = await Contact.find(
    { owner, ...filter },
    {},
    { skip, limit }
  ).populate("owner", "email subscription");
  res.status(200).json(contacts);
};

module.exports = getAll;
