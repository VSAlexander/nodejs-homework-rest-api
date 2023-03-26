const Contact = require("../../models/contact");

const { handleRequestError } = require("../../helpers");

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);
  if (!contact) {
    throw handleRequestError(404, "Not found");
  }
  res.status(200).json(contact);
};

module.exports = getById;
