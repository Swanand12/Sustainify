import mongoose from "mongoose";

const bidSchema = mongoose.Schema(
  {
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    buyer: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        default: null,
      },
    ],
    totalCost: {
      type: Number,
    },
    pricePerToken: {
      type: Number,
    },
    energyTokensToSell: {
      type: Number,
    },
    sellerAddress: {
      type: String,
    },
    buyerAddress: {
      type: String,
      default: "",
    },
    isAccepted: {
      type: Boolean,
      default: false,
    },
    bidClosingTime: {
      type: String,
      default: "2 hours",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Bids", bidSchema);
