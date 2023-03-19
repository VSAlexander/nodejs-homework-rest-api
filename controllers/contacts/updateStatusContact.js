const Contact = require("../../models/contact");
const { handleRequestError } = require("../../helpers");

const updateStatusContact = async (req, res, next) => {
  const { contactId } = req.params;
  const updatedContact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!updatedContact) {
    throw handleRequestError(404, "Not found");
  }

  res.status(200).json(updatedContact);
};

module.exports = updateStatusContact;
