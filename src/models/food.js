const mongodb = require("../config/db");
const ObjectId = require("mongodb").ObjectId;
const collectionName = "food";

const model = {};

const getCollection = async () => {
  if (!collectionName) throw new Error("Collection name is null!");
  return await mongodb.getCollection(collectionName);
};

const getObjectId = (id) => {
  return new ObjectId(id);
};

const idOrLastId = async (id, collection = null) => {
  if (id === "undefined") {
    const lastRecord = await getLastRecord(collection);
    id = lastRecord._id;
  }

  return getObjectId(id);
};

const getLastRecord = async (collection = null) => {
  if (!collection) collection = await getCollection();
  const response = collection.find({}).sort({ _id: -1 }).limit(1);
  const lastRecord = await response.toArray();

  return lastRecord[0];
};

model.getAll = async () => {
  try {
    const collection = await getCollection();
    const result = await collection.find().toArray();

    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

model.getOne = async (id) => {
  try {
    const collection = await getCollection();
    const foodId = getObjectId(id);
    const result = await collection.find({ _id: foodId }).toArray();

    return result[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

model.create = async (newFood) => {
  try {
    const collection = await getCollection();
    const response = await collection.insertOne(newFood);

    return {
      success: response.acknowledged,
      error: response.error,
      response
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

model.update = async (id, food) => {
  try {
    const collection = await getCollection();
    const foodId = await idOrLastId(id, collection);
    // be aware of updateOne if you only want to update specific fields
    const response = await collection.replaceOne({ _id: foodId }, food);

    return {
      success: response.modifiedCount > 0,
      error: response.error,
      response
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

model.delete = async (id) => {
  try {
    const collection = await getCollection();
    const foodId = await idOrLastId(id, collection);
    const response = await collection.deleteOne({ _id: foodId });

    return {
      success: response.deletedCount > 0,
      error: response.error,
      response
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = model;
