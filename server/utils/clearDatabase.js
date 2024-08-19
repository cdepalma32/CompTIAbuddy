const db = require("../config/connection");

module.exports = async () => {
  try {
    await new Promise((resolve, reject) => {
      db.once("open", async () => {
        try {
          const collections = await db.db.listCollections().toArray();

          if (collections.length) {
            console.log("Dropping all collections...🌱");
            for (let collection of collections) {
              await db.db.dropCollection(collection.name);
              console.log(`Dropped collection: ${collection.name}🌱`);
            }
          } else {
            console.log("No collections found to drop.🌱");
          }

          resolve(); // Resolve after dropping all collections
        } catch (error) {
          reject(error); // Reject if an error occurs
        }
      });
    });
  } catch (err) {
    console.error("Error dropping collections:🌱", err);
    throw err;
  }
};
