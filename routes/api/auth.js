const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/auth");
const { validateReqBody, authenticate, upload } = require("../../middlewares");
const { ctrlWrapper } = require("../../helpers");
const {
  signupSchema,
  loginSchema,
  updateStatusUserSchema,
  verifyEmailSchema,
} = require("../../schemas/users");

router.post("/signup", validateReqBody(signupSchema), ctrlWrapper(ctrl.signup));

router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verify));

router.post(
  "/verify",
  validateReqBody(verifyEmailSchema),
  ctrlWrapper(ctrl.resendEmail)
);

router.post("/login", validateReqBody(loginSchema), ctrlWrapper(ctrl.login));

router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrentUser));

router.get("/logout", authenticate, ctrlWrapper(ctrl.logout));

router.patch(
  "/users",
  authenticate,
  validateReqBody(updateStatusUserSchema),
  ctrlWrapper(ctrl.updateStatusUser)
);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateUserAvatar)
);

module.exports = router;
