const router = require("express").Router();
const contactsController = require("../controllers/contacts");
const { isAuthenticated } = require("../utils/auth");
const { contactValidation } = require("../utils/validation");
const { rules: validationRules, validate } = contactValidation;

router.get("/", contactsController.getAll);

router.get("/:id", contactsController.getSingle);

router.post("/", isAuthenticated, validationRules(), validate, contactsController.createContact);

router.put("/:id", isAuthenticated, validationRules(), validate, contactsController.updateContact);

router.delete("/:id", isAuthenticated, contactsController.deleteContact);

module.exports = router;
