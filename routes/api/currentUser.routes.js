const express = require("express");

const router = express.Router();

const { controllerWrapper, userVerification } = require("../../middlewares");

const { getCurrent } = require("../../controllers/currentUser");

router.get("/current", userVerification, controllerWrapper(getCurrent));

module.exports = router;
