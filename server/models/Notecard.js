const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const NotecardSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },

  content: {
    type: String,
    required: true,
    trim: true,
  },

  chapter: {
    type: Schema.Types.ObjectId,
    ref: "Chapter",
  },

  category: {
    type: String,
    trim: true,
  },

  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard"],
    default: "medium",
  },

  imageUrl: {
    type: String,
    trim: true,
  },

  activities: [
    {
      type: Schema.Types.ObjectId,
      ref: "Activity",
    },
  ],

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
});

const Notecard = mongoose.model("Notecard", NotecardSchema);

module.exports = Notecard;
