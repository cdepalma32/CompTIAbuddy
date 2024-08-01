const { Schema, model } = require("mongoose");

const CertificationSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
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
    isPurchased: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Certification = model("Certification", CertificationSchema);
module.exports = Certification;
