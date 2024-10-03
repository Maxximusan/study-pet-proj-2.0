const express = require("express");

const router = express.Router();

const {
  getAllContacts,
  contactByIdGet,
  contactRemove,
  contactAdd,
  contactUpdate,
  contactUpdateFavorite,
} = require("../../controllers/contacts/contactController");

const {
  validation,
  controllerWrapper,
  isValidId,
} = require("../../middlewares");
const {
  schemaAdd,
  schemaUpdate,
  updateFavoriteSchema,
} = require("../../schemas/contactsSchema");

router.get("/", controllerWrapper(getAllContacts));

router.get("/:contactId", isValidId, controllerWrapper(contactByIdGet));

router.post("/", validation(schemaAdd), controllerWrapper(contactAdd));

router.delete("/:contactId", isValidId, controllerWrapper(contactRemove));

router.put(
  "/:contactId",
  isValidId,
  validation(schemaUpdate),
  controllerWrapper(contactUpdate)
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validation(updateFavoriteSchema),
  controllerWrapper(contactUpdateFavorite)
);

module.exports = router;
