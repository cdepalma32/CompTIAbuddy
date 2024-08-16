require("dotenv").config(); // Ensure environment variables are loaded
const mongoose = require("mongoose");
const models = require("../models"); // Assuming all your models are exported from this file

const clearDatabase = async (modelName, collectionName) => {
  try {
    console.log("Clearing the database...🧼");

    if (process.env.NODE_ENV === "production") {
      throw new Error("Cannot clear the database in a production environment!");
    }

    // Ensure we are connected to the database
    if (mongoose.connection.readyState === 0) {
      console.log("No active database connection found. Connecting...🧼");
      await mongoose.connect(
        process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/compTIAbuddy"
      );
    }

    // Dropping specific collection if modelName and collectionName are provided
    if (modelName && collectionName) {
      if (!models[modelName]) {
        throw new Error(`Model ${modelName} does not exist.`);
      }

      const modelExists = await models[modelName].db.db
        .listCollections({ name: collectionName })
        .toArray();

      if (modelExists.length) {
        await mongoose.connection.dropCollection(collectionName);
        console.log(`Dropped collection: ${collectionName}🧼`);
      } else {
        console.log(
          `Collection ${collectionName} does not exist, skipping...🧼`
        );
      }
    }
    // Dropping all collections if no specific collection is provided
    else {
      const collections = Object.keys(mongoose.connection.collections);
      for (const collection of collections) {
        try {
          await mongoose.connection.collections[collection].drop();
          console.log(`Dropped collection: ${collection}🧼`);
        } catch (error) {
          if (error.message.includes("ns not found")) {
            console.log(
              `Collection ${collection} does not exist, skipping...🧼`
            );
          } else {
            throw error;
          }
        }
      }
    }

    await mongoose.connection.close();
    console.log("Database connection closed. Database cleared successfully.🧼");
  } catch (err) {
    console.error("Error clearing database:", err.message);
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close(); // Ensure connection is closed even if an error occurs
    }
    process.exit(1);
  }
};

const args = process.argv.slice(2);
const modelName = args[0];
const collectionName = args[1];

clearDatabase(modelName, collectionName)
  .then(() => {
    console.log("Operation completed successfully.🧼");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Operation failed:", error.message);
    if (mongoose.connection.readyState !== 0) {
      mongoose.connection.close();
    }
    process.exit(1);
  });

module.exports = clearDatabase;
