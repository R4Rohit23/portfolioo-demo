const mongoose = require("mongoose");

module.exports.findOne = async (
  findQuerry,
  databaseObject,
  collectionName,
  projection = undefined,
  errorMessage = undefined
) => {
  try {
    await databaseObject.connect();
    const collectionModel = await databaseObject.getModel(collectionName);
    console.log(
      `Executing findQuerry - ${JSON.stringify(
        findQuerry
      )} over ${collectionName}`
    );
    let result = undefined;
    if (projection) {
      result = await collectionModel.findOne(findQuerry, projection);
    } else {
      result = await collectionModel.findOne(findQuerry);
    }
    console.log(`findQuerry result is - ${JSON.stringify(result)}`);
    if (result) {
      return result;
    } else {
      if (errorMessage) {
        throw new Error(errorMessage);
      }
    }
    return result;
  } catch (error) {
    console.log(`Error finding doc with findQuerry - ${error}`);
    throw error;
  }
};

module.exports.find = async (
  findQuerry,
  databaseObject,
  collectionName,
  projection = undefined,
  sortQuerry = undefined
) => {
  try {
    await databaseObject.connect();
    const collectionModel = await databaseObject.getModel(collectionName);
    console.log(
      `Executing findQuerry - ${JSON.stringify(
        findQuerry
      )} over ${collectionName}`
    );
    let result = undefined;
    let sort = sortQuerry ? sortQuerry : { _id: -1 };
    if (projection) {
      result = await collectionModel.find(findQuerry, projection).sort(sort);
    } else {
      result = await collectionModel.find(findQuerry).sort(sort);
    }
    console.log(`findQuerry result is - ${JSON.stringify(result)}`);
    return result;
  } catch (error) {
    console.log(`Error finding docs with findQuerry - ${error}`);
    throw error;
  }
};

module.exports.create = async (newObj, databaseObject, collectionName) => {
  try {
    await databaseObject.connect();
    const collectionModel = await databaseObject.getModel(collectionName);
    console.log(
      `Executing create - ${JSON.stringify(newObj)} over ${collectionName}`
    );
    const result = await collectionModel.create(newObj);
    console.log(
      `create result - ${JSON.stringify(result)} over ${collectionName}`
    );
    return result;
  } catch (error) {
    console.log(`Error creating doc with error - ${error}`);
    throw error;
  }
};

module.exports.updateOne = async (
  filter,
  update,
  upsertFlag,
  databaseObject,
  collectionName,
  errorMessage = undefined
) => {
  try {
    await databaseObject.connect();
    const collectionModel = await databaseObject.getModel(collectionName);

    // Add updatedAt and updatedAtEp fields to the update object
    update.updatedAt = new Date();
    update.updatedAtEP = Math.floor(Date.now() / 1000);

    console.log(
      `Executing updateOne - Filter: ${JSON.stringify(
        filter
      )}, over ${collectionName}`
    );

    const result = await collectionModel.updateOne(
      filter,
      { $set: update },
      { upsert: upsertFlag }
    );

    // if (!result.modifiedCount && errorMessage) {
    //     throw new Error(errorMessage);
    // }

    console.log(`updateOne result - ${JSON.stringify(result)}`);
    return result;
  } catch (error) {
    console.log(`Error updating document: ${error}`);
    throw error;
  }
};

module.exports.updateOne2 = async (
  filter,
  update,
  upsertFlag,
  databaseObject,
  collectionName,
  errorMessage = undefined
) => {
  try {
    await databaseObject.connect();
    const collectionModel = await databaseObject.getModel(collectionName);

    // Add updatedAt and updatedAtEp fields to the update object
    update.updatedAt = new Date();
    update.updatedAtEP = Math.floor(Date.now() / 1000);

    console.log(
      `Executing updateOne - Filter: ${JSON.stringify(
        filter
      )}, Update: ${JSON.stringify(update)} over ${collectionName}`
    );

    const result = await collectionModel.updateOne(filter, update, {
      upsert: upsertFlag,
    });

    if (!result.modifiedCount && errorMessage) {
      throw new Error(errorMessage);
    }

    console.log(`updateOne result - ${JSON.stringify(result)}`);
    return result;
  } catch (error) {
    console.log(`Error updating document: ${error}`);
    throw error;
  }
};

module.exports.deleteOne = async (
  filter,
  databaseObject,
  collectionName,
  errorMessage = undefined
) => {
  try {
    await databaseObject.connect();
    const collectionModel = await databaseObject.getModel(collectionName);

    console.log(
      `Executing deleteOne - Filter: ${JSON.stringify(
        filter
      )} over ${collectionName}`
    );

    const result = await collectionModel.deleteOne(filter);

    if (!result.deletedCount && errorMessage) {
      throw new Error(errorMessage);
    }

    console.log(`deleteOne result - ${JSON.stringify(result)}`);
    return result;
  } catch (error) {
    console.log(`Error deleting document: ${error}`);
    throw error;
  }
};

module.exports.deleteOne = async (
  filter,
  databaseObject,
  collectionName,
  errorMessage = undefined
) => {
  try {
    await databaseObject.connect();
    const collectionModel = await databaseObject.getModel(collectionName);

    console.log(
      `Executing deleteOne - Filter: ${JSON.stringify(
        filter
      )} over ${collectionName}`
    );

    const result = await collectionModel.deleteOne(filter);

    if (!result.deletedCount && errorMessage) {
      throw new Error(errorMessage);
    }

    console.log(`deleteOne result - ${JSON.stringify(result)}`);
    return result;
  } catch (error) {
    console.log(`Error deleting document: ${error}`);
    throw error;
  }
};

module.exports.convertStringIDToMongooseId = (id) => {
  try {
    const mongooseId = new mongoose.Types.ObjectId(id);
    return mongooseId;
  } catch (error) {
    console.error(`Error converting string ID to Mongoose ObjectId: ${error}`);
    throw new Error(`Invalid Id - ${id}`);
  }
};

module.exports.aggregate = async (pipeline, databaseObject, collectionName) => {
  try {
    await databaseObject.connect();
    const collectionModel = await databaseObject.getModel(collectionName);

    console.log(
      `Executing aggregate pipeline on ${collectionName} and ${JSON.stringify(
        pipeline
      )}`
    );

    const result = await collectionModel.aggregate(pipeline);

    console.log(`Aggregate result - ${JSON.stringify(result)}`);
    return result;
  } catch (error) {
    console.log(`Error aggregating document: ${error}`);
    throw error;
  }
};
