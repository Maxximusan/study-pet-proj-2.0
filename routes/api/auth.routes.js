const express = require("express");

const router = express.Router();

const {
  validation,
  controllerWrapper,
  userVerification,
} = require("../../middlewares");

const {
  joiSingupSchema,
  joiLoginSchema,
} = require("../../schemas/authSchemas");

const auth = require("../../controllers/auth");

router.post(
  "/signup",
  validation(joiSingupSchema),
  controllerWrapper(auth.signup)
);

router.post(
  "/login",
  validation(joiLoginSchema),
  controllerWrapper(auth.login)
);

router.get("/logout", userVerification, controllerWrapper(auth.logout));

module.exports = router;
