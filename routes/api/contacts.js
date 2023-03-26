const express = require("express");
const router = express.Router();

const { ctrlWrapper } = require("../../helpers");
const { validateReqBody, isValidId } = require("../../middlewares");
const {
  addAndUpdateSchema,
  updateStatusSchema,
} = require("../../schemas/contacts");

const ctrl = require("../../controllers/contacts");

router.get("/", ctrlWrapper(ctrl.getAll));
router.get("/:contactId", isValidId, ctrlWrapper(ctrl.getById));
router.post("/", validateReqBody(addAndUpdateSchema), ctrlWrapper(ctrl.create));
router.put(
  "/:contactId",
  isValidId,
  validateReqBody(addAndUpdateSchema),
  ctrlWrapper(ctrl.updateById)
);
router.patch(
  "/:contactId/favorite",
  isValidId,
  validateReqBody(updateStatusSchema),
  ctrlWrapper(ctrl.updateStatusContact)
);
router.delete("/:contactId", isValidId, ctrlWrapper(ctrl.deleteById));

module.exports = router;
