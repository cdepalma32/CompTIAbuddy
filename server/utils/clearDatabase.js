require("dotenv").config(); // Ensure environment variables are loaded
const mongoose = require("mongoose");
const db = require("../config/connection"); // This imports the connection you've defined
const models = require("../models"); // Assuming all your models are exported from this file

const clearDatabase = async (modelName, collectionName) => {
  try {
    console.log("Environment:", process.env.NODE_ENV);

    if (process.env.NODE_ENV === "production") {
      throw new Error("Cannot clear the database in a production environment!");
    }

    console.log("Checking database connection...");

    // Ensure we are connected to the database
    if (mongoose.connection.readyState === 0) {
      console.log("No active database connection found, connecting now...");
      await mongoose.connect(
        process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/compTIAbuddy",
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }
      );
      console.log("Connected to the database.");
    } else {
      console.log("Using existing database connection.");
    }

    if (modelName && collectionName) {
      console.log(
        `Attempting to drop collection: ${collectionName} in model: ${modelName}`
      );

      if (!models[modelName]) {
        throw new Error(`Model ${modelName} does not exist.`);
      }

      const modelExists = await models[modelName].db.db
        .listCollections({ name: collectionName })
        .toArray();

      console.log(`Model exists check result: ${modelExists.length}`);

      if (modelExists.length) {
        await mongoose.connection.dropCollection(collectionName);
        console.log(`Dropped collection: ${collectionName}`);
      } else {
        console.log(`Collection ${collectionName} does not exist.`);
      }
    } else {
      console.log("Dropping all collections...");
      const collections = Object.keys(mongoose.connection.collections);
      for (const collection of collections) {
        console.log(`Dropping collection: ${collection}`);
        await mongoose.connection.collections[collection].drop();
        console.log(`Dropped collection: ${collection}`);
      }
    }

    console.log("Closing database connection...");
    await mongoose.connection.close();
    console.log("Database cleared and connection closed.");
  } catch (err) {
    console.error("Error clearing database:", err.message);
    process.exit(1);
  }
};

const args = process.argv.slice(2);
console.log("Command-line arguments:", args);

const modelName = args[0];
const collectionName = args[1];

console.log(`Model Name: ${modelName}, Collection Name: ${collectionName}`);

clearDatabase(modelName, collectionName)
  .then(() => {
    console.log("Operation completed successfully.");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Operation failed:", error.message);
    process.exit(1);
  });
