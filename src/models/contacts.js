const mongodb = require("../config/db");
const ObjectId = require("mongodb").ObjectId;
const collectionName = "contacts";

const model = {};

const getCollection = async () => {
  return await mongodb.getCollection(collectionName);
};

const getObjectId = (id) => {
  return new ObjectId(id);
};

const idOrLastId = async (id, contacts = null) => {
  if (id === "undefined") {
    const lastRecord = await getLastRecord(contacts);
    id = lastRecord._id;
  }

  return getObjectId(id);
};

const getLastRecord = async (contacts = null) => {
  if (!contacts) contacts = await getCollection();
  const response = contacts.find({}).sort({ _id: -1 }).limit(1);
  const lastRecord = await response.toArray();

  return lastRecord[0];
};

model.getAll = async () => {
  try {
    const contacts = await getCollection();
    const result = await contacts.find().toArray();

    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

model.getOne = async (id) => {
  try {
    const contacts = await getCollection();
    const userId = getObjectId(id);
    const result = await contacts.find({ _id: userId }).toArray();

    return result[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

model.create = async (newContact) => {
  try {
    const contacts = await getCollection();
    const response = await contacts.insertOne(newContact);
    console.log(response);

    return {
      success: response.acknowledged,
      error: response.error,
      response
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

model.update = async (id, contact) => {
  try {
    const contacts = await getCollection();
    const userId = await idOrLastId(id, contacts);
    // be aware of updateOne if you only want to update specific fields
    const response = await contacts.replaceOne({ _id: userId }, contact);

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
    const contacts = await getCollection();
    const userId = await idOrLastId(id, contacts);
    const response = await contacts.deleteOne({ _id: userId });

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
