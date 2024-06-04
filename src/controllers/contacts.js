const contactsModel = require("../models/contacts");
const ctrl = {};

ctrl.getAll = async (req, res) => {
  try {
    const contacts = await contactsModel.getAll();

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

ctrl.getSingle = async (req, res) => {
  try {
    const contact = await contactsModel.getOne(req.params.id);

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contact);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

ctrl.createContact = async (req, res) => {
  try {
    const newContact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };
    const result = await contactsModel.create(newContact);

    if (result.success) {
      res.status(201).json(result.response);
    } else {
      res.status(500).json(
        result.error || 'Some error occurred while creating the contact.'
      );
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

ctrl.updateContact = async (req, res) => {
  try {
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };
    const result = await contactsModel.update(req.params.id, contact);

    if (result.success) {
      res.status(204).send();
    } else {
      res.status(500).json(
        result.error || 'Some error occurred while updating the contact.'
      );
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

ctrl.deleteContact = async (req, res) => {
  try {
    const deleteId = req.params.id;
    const result = await contactsModel.delete(deleteId);

    if (result.success) {
      res.status(204).send();
    } else {
      res.status(500).json(
        result.error || 'Some error occurred while deleting the contact.'
      );
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = ctrl;