const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const QuizSchema = new Schema(
  {
    question: {
      type: String,
      required: true,
      trim: true,
    },
    answers: {
      type: [String], // Array of possible answers
      required: true,
      validate: [arrayLimit, "Answers array should not be empty"],
    },
    answer: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      trim: true,
    },
    chapter: {
      type: Schema.Types.ObjectId,
      ref: "Chapter",
    },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"], // Difficulty levels
      default: "medium",
    },
    notes: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        text: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

// Custom validation function to ensure answers array is not empty
function arrayLimit(val) {
  return val.length > 0;
}

const Quiz = model("Quiz", QuizSchema);

module.exports = Quiz;
