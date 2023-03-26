const Contact = require("../../models/contact");
const { handleRequestError } = require("../../helpers");

const deleteById = async (req, res, next) => {
  const { contactId } = req.params;
  const deletedContact = await Contact.findByIdAndDelete(contactId);
  if (!deletedContact) {
    throw handleRequestError(404, "Not found");
  }

  res.status(200).json({
    message: "Contact deleted",
  });
};

module.exports = deleteById;
