const contactsModel = require("../models/contacts");
const ctrl = {};

const getContactFromRequest = (req) => {
  return {
    displayName: req.body.displayName,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    nickname: req.body.nickname,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
};

ctrl.getAll = async (req, res) => {
  // #swagger.summary = "GET all"
  // #swagger.tags = ["Contacts"]
  try {
    const contacts = await contactsModel.getAll();

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

ctrl.getSingle = async (req, res) => {
  // #swagger.summary = "GET by id"
  // #swagger.tags = ["Contacts"]
  try {
    const contact = await contactsModel.getOne(req.params.id);

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(contact);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

ctrl.createContact = async (req, res) => {
  // #swagger.tags = ["Contacts"]
  // #swagger.description = "This endpoint requires authentication. For logging in visit '/auth' page."
  /*  #swagger.parameters['body'] = {
        in: 'body',
        schema: {                
          displayName: "any",
          firstName: "any",
          lastName: "any",
          nickname: "any",
          email: 'any@any.com',
          favoriteColor: "any",
          birthday: "any"
        }
    } */
  try {
    const newContact = getContactFromRequest(req);
    const result = await contactsModel.create(newContact);

    if (result.success) {
      res.status(201).json(result.response);
    } else {
      res.status(500).json(result.error || "Some error occurred while creating the contact.");
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

ctrl.updateContact = async (req, res) => {
  // #swagger.tags = ["Contacts"]
  // #swagger.description = "This endpoint requires authentication. For logging in visit '/auth' page."
  /*  #swagger.parameters['body'] = {
        in: 'body',
        schema: {                
          displayName: "any",
          firstName: "any",
          lastName: "any",
          nickname: "any",
          email: 'any@any.com',
          favoriteColor: "any",
          birthday: "any"
        }
    } */

  try {
    const contact = getContactFromRequest(req);
    const updateId = req.params.id;
    const result = await contactsModel.update(updateId, contact);

    if (result.success) {
      res.status(204).send();
    } else {
      res.status(500).json(result.error || "Some error occurred while updating the contact.");
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

ctrl.deleteContact = async (req, res) => {
  // #swagger.tags = ["Contacts"]
  // #swagger.description = "This endpoint requires authentication. For logging in visit '/auth' page."
  try {
    const deleteId = req.params.id;
    const result = await contactsModel.delete(deleteId);

    if (result.success) {
      res.status(204).send();
    } else {
      res.status(500).json(result.error || "Some error occurred while deleting the contact.");
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = ctrl;
