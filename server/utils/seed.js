const mongoose = require("mongoose");
const dotenv = require("dotenv");
const clearDatabase = require("./clearDatabase");
const { User } = require("../models");
const bcrypt = require("bcrypt");

// Load environment variables
dotenv.config();

const seedData = async () => {
  try {
    console.log("Step 1: Clearing the database...🌱");
    await clearDatabase(); // Clears the database once at the start
    console.log("Database cleared successfully.🌱");

    console.log("Step 2: Seeding users...🌱");

    const users = [
      {
        username: "lovey1",
        email: "email1@email.com",
        password: "password1",
      },
      {
        username: "lovey2",
        email: "email2@email.com",
        password: "password2",
      },
      {
        username: "lovey3",
        email: "email3@email.com",
        password: "password3",
      },
    ];

    for (let user of users) {
      console.log(`Hashing password for user: ${user.username}🌱`);
      user.password = await bcrypt.hash(user.password, 10); // Hash the password
    }

    console.log("Inserting users into the database...🌱");
    const insertedUsers = await User.insertMany(users);
    console.log(`Inserted ${insertedUsers.length} users successfully.🌱`);

    console.log("Step 3: Closing database connection...🌱");
    await mongoose.connection.close();
    console.log("Database connection closed.🌱");
  } catch (err) {
    console.error("Error seeding database:🌱", err);
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close(); // Ensure the connection is closed even on error
    }
    process.exit(1);
  }
};

const connectAndSeed = async () => {
  const dbUri =
    process.env.MONGODB_URI || "mongodb://localhost/your-database-name";

  if (mongoose.connection.readyState === 0) {
    mongoose
      .connect(dbUri)
      .then(() => {
        console.log("Connected to MongoDB🌱");
        seedData();
      })
      .catch((err) => {
        console.error("Error connecting to MongoDB:🌱", err);
        process.exit(1);
      });
  } else {
    console.log("Using existing database connection.🌱");
    seedData();
  }
};

connectAndSeed();
