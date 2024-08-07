const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const FlashcardSchema = new Schema(
  {
    question: {
      type: String,
      required: true,
      trim: true,
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

    activities: [
      {
        type: Schema.Types.ObjectId,
        ref: "Activity",
      },
    ],

    chapter: {
      type: Schema.Types.ObjectId,
      ref: "Chapter",
    },

    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"], // Difficulty levels
      default: "medium",
    },

    imageUrl: {
      type: String,
      trim: true,
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
    timestamps: true,
  }
);

const Flashcard = mongoose.model("Flashcard", FlashcardSchema);

module.exports = Flashcard;
