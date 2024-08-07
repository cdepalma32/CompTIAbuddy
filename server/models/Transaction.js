const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const TransactionSchema = new Schema(
  {
    stripeTransactionId: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    created: {
      type: Date,
      required: true,
    },
    certificationId: {
      type: Schema.Types.ObjectId,
      ref: "Certification",
    },
  },
  {
    timestamps: true,
  }
);

const Transaction = model("Transaction", TransactionSchema);
module.exports = Transaction;
