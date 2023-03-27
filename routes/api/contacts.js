const express = require("express");
const router = express.Router();

const { ctrlWrapper } = require("../../helpers");
const {
  validateReqBody,
  isValidId,
  authenticate,
} = require("../../middlewares");

const {
  addAndUpdateSchema,
  updateStatusSchema,
} = require("../../schemas/contacts");

const ctrl = require("../../controllers/contacts");

router.get("/", authenticate, ctrlWrapper(ctrl.getAll));
router.get("/:contactId", authenticate, isValidId, ctrlWrapper(ctrl.getById));
router.post(
  "/",
  authenticate,
  validateReqBody(addAndUpdateSchema),
  ctrlWrapper(ctrl.create)
);
router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateReqBody(addAndUpdateSchema),
  ctrlWrapper(ctrl.updateById)
);
router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateReqBody(updateStatusSchema),
  ctrlWrapper(ctrl.updateStatusContact)
);
router.delete(
  "/:contactId",
  authenticate,
  isValidId,
  ctrlWrapper(ctrl.deleteById)
);

module.exports = router;
