const foodModel = require("../models/food");
const ctrl = {};

ctrl.getAll = async (req, res) => {
  // #swagger.summary = "GET all"
  // #swagger.tags = ["Food"]
  try {
    const food = await foodModel.getAll();

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(food);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

ctrl.getSingle = async (req, res) => {
  // #swagger.summary = "GET by id"
  // #swagger.tags = ["Food"]
  try {
    const food = await foodModel.getOne(req.params.id);

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(food);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

ctrl.createFood = async (req, res) => {
  // #swagger.tags = ["Food"]
  try {
    const newFood = {
      name: req.body.name,
      price: req.body.price,
      quantity: req.body.quantity,
      weight: req.body.weight,
      manager: req.body.manager
    };
    const result = await foodModel.create(newFood);

    if (result.success) {
      res.status(201).json(result.response);
    } else {
      res.status(500).json(result.error || "Some error occurred while creating the food.");
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

ctrl.updateFood = async (req, res) => {
  // #swagger.tags = ["Food"]
  try {
    const food = {
      name: req.body.name,
      price: req.body.price,
      quantity: req.body.quantity,
      weight: req.body.weight,
      manager: req.body.manager
    };
    const updateId = req.params.id;
    const result = await foodModel.update(updateId, food);

    if (result.success) {
      res.status(204).send();
    } else {
      res.status(500).json(result.error || "Some error occurred while updating the food.");
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

ctrl.deleteFood = async (req, res) => {
  // #swagger.tags = ["Food"]
  try {
    const deleteId = req.params.id;
    const result = await foodModel.delete(deleteId);

    if (result.success) {
      res.status(204).send();
    } else {
      res.status(500).json(result.error || "Some error occurred while deleting the food.");
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// const getFoodFromRequest = (req) => {
//   return {
//     name: req.body.name,
//     price: req.body.price,
//     quantity: req.body.quantity,
//     weight: req.body.weight,
//     manager: req.body.manager
//   };
// }

module.exports = ctrl;
