import transactionModel from "../models/transactionModel.js";

export const fetchAllTransactionsForBidController = async (req, res) => {
  try {
    const { bid } = req.params;

    const transactions = await transactionModel
      .find({ transactionBid: bid })
      .populate("buyer", "name")
      .sort({ totalCost: -1 });

    res.status(200).send({
      success: true,
      message: "Successfully fetched all transactions",
      transactions,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while fetching transactions",
      error,
    });
  }
};
