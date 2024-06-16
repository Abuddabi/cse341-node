const mongodb = require("../config/db");

const getData = async (req, res) => {
  const db = await mongodb.getDb().db();
  const result = db.collection("user").find();
  const lists = await result.toArray();

  res.setHeader("Content-Type", "application/json");
  res.status(200).json(lists[0]); // we just need the first one (the only one)
};

module.exports = { getData };
