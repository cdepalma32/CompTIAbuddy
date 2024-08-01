const { Schema, model } = require("mongoose");

const PaymentMethodSchema = new Schema(
  {
    stripePaymentMethodId: {
      type: String,
      required: true,
    },
    brand: String,
    last4: String,
    expMonth: Number,
    expYear: Number,
    isDefault: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const PaymentMethod = model("PaymentMethod", PaymentMethodSchema);
module.exports = PaymentMethod;
