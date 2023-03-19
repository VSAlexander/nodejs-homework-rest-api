const Contact = require("../../models/contact");

const create = async (req, res, next) => {
  const newContact = await Contact.create(req.body);
  res.status(201).json(newContact);
};

module.exports = create;
