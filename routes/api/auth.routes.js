const express = require("express");

const router = express.Router();

const {
  validation,
  controllerWrapper,
  isValidId,
} = require("../../middlewares");

const {
  joiSingupSchema,
  joiLoginSchema,
} = require("../../schemas/authSchemas");

const auth = require("../../controllers/auth");

router.post(
  "/singup",
  validation(joiSingupSchema),
  controllerWrapper(auth.singup)
);

router.post(
  "/login",
  validation(joiLoginSchema),
  controllerWrapper(auth.login)
);

module.exports = router;
