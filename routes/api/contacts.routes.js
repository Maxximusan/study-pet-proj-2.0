const express = require("express");

const router = express.Router();

const {
  getAllContacts,
  contactByIdGet,
  contactRemove,
  contactAdd,
  contactUpdate,
} = require("../../controllers/contactController");

const { validation, controllerWrapper } = require("../../middlewares");
const { schemaAdd, schemaUpdate } = require("../../schemas/contactsSchema");

router.get("/", controllerWrapper(getAllContacts));

router.get("/:contactId", controllerWrapper(contactByIdGet));

router.post("/", validation(schemaAdd), controllerWrapper(contactAdd));

router.delete("/:contactId", controllerWrapper(contactRemove));

router.put(
  "/:contactId",
  validation(schemaUpdate),
  controllerWrapper(contactUpdate)
);

module.exports = router;
