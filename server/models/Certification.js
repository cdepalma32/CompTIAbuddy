const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const CertificationSchema = new Schema(
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
    chapters: [
      {
        type: Schema.Types.ObjectId,
        ref: "Chapter",
      },
    ],
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically add 'createdAt' and 'updatedAt' fields
  }
);

const Certification = model("Certification", CertificationSchema);
module.exports = Certification;
