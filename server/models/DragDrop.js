const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const DragDropSchema = new Schema(
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

    items: [
      {
        name: {
          type: String,
          required: true,
        },
        id: {
          type: Schema.Types.ObjectId,
          auto: true,
        },
      },
    ],

    // drop zones where items can be dropped
    dropZones: [
      {
        name: {
          type: String,
          required: true,
        },
        id: {
          type: Schema.Types.ObjectId,
          auto: true,
        },
      },
    ],

    // associations between items and drop zones
    correctMapping: [
      {
        itemId: {
          type: Schema.Types.ObjectId,
          ref: "Item", // reference to item model
        },
        dropZoneId: {
          type: Schema.Types.ObjectId,
          ref: "DropZone", // reference to DropZone model
        },
      },
    ],

    // current state of the drag-drop activity
    state: {
      type: Map,
      of: Schema.Types.Mixed,
    },

    // Indicator of activity completion
    isCompleted: {
      type: Boolean,
      default: false,
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

const DragDrop = mongoose.model("DragDrop", DragDropSchema);

module.exports = DragDrop;

// NOTES!!!!
// front end integration will need:
// ui component to render draggable items and drop zones ie (react-beautiful-dnd or react-dnd)
// state management -- keep tracxk of current positions of items and handle dnd interactions
// api calls - to interact with the backend to save the activity state / fetch activity data

// also consider:
// validation, feedback and persistence (save the state of activity to DB if needed)
