const router = require("express").Router();
const contactsController = require("../controllers/contacts");
const { contactValidation } = require("../utils/validation");
const { rules: validationRules, validate } = contactValidation;

router.get("/", contactsController.getAll);

router.get("/:id", contactsController.getSingle);

router.post("/", validationRules(), validate, contactsController.createContact);

router.put("/:id", validationRules(), validate, contactsController.updateContact);

router.delete("/:id", contactsController.deleteContact);

module.exports = router;
