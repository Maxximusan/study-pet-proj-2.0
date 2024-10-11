const express = require("express");

const router = express.Router();

const {
  getAllLikedCats,
  catAdd,
  removeCat,
} = require("../../controllers/cats/catsController");

const {
  validation,
  controllerWrapper,
  isValidId,
  userVerification,
} = require("../../middlewares");

const { schemaAddCat } = require("../../schemas/catsSchemas");

router.get("/", userVerification, controllerWrapper(getAllLikedCats));

router.post(
  "/",
  userVerification,
  validation(schemaAddCat),
  controllerWrapper(catAdd)
);

router.delete("/:catId", isValidId, controllerWrapper(removeCat));

module.exports = router;
