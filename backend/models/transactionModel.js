import mongoose from "mongoose";

const transactionSchema = mongoose.Schema(
  {
    transactionBid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bids",
    },
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    biddingPrice: {
      type: Number,
    },
    totalCost: {
      type: Number,
    },
    transactionStatus: {
      type: String,
      enum: ["Accepted", "Pending", "Not Accepted"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Transactions", transactionSchema);
