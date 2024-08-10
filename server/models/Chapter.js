const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const ChapterSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    quizzes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Quiz",
      },
    ],

    notecards: [
      {
        type: Schema.Types.ObjectId,
        ref: "Notecard",
      },
    ],

    flashcards: [
      {
        type: Schema.Types.ObjectId,
        ref: "Flashcard",
      },
    ],

    dragdrops: [
      {
        type: Schema.Types.ObjectId,
        ref: "DragDrop",
      },
    ],

    isCompleted: {
      type: Boolean,
      default: false,
    },

    progress: {
      type: Number, // percentage can go here
      default: 0,
    },

    estimatedTime: {
      type: Number, // e.g., time in minutes
      default: 0,
    },

    grade: {
      type: Number,
      default: null,
    },

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

const Chapter = model("Chapter", ChapterSchema);

module.exports = Chapter;

// NOTES :
// potential extra fields: ???

// user adds comments / notes to each chapter
// media - img / videos related to chapter
// last accessed (chapter accessed by user)
// additional resources / links relevant to chapter
// order/position of chapter : to sequence on the page, as needed
