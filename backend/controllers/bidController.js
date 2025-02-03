import bidModel from "../models/bidModel.js";
import transactionModel from "../models/transactionModel.js";
import walletModel from "../models/walletModel.js";

export const postBidController = async (req, res) => {
  try {
    const { sellerAddress, pricePerToken, energyTokensToSell, closingTime } =
      req.body;

    if (!pricePerToken || !energyTokensToSell || !sellerAddress) {
      return res.status(400).send({
        success: false,
        message: "Please fill all the fields",
      });
    }

    const wallet = await walletModel.findOne({ user: req.user._id });

    if (!wallet) {
      return res.status(400).send({
        success: false,
        message: "You have to connect your wallet first",
      });
    }

    if (wallet.availableEnergyTokens < energyTokensToSell) {
      return res.status(400).send({
        success: false,
        message: "You dont have an enough energy tokens to sell",
      });
    }

    const bid = await bidModel.create({
      seller: req.user._id,
      totalCost: pricePerToken * energyTokensToSell,
      pricePerToken,
      energyTokensToSell,
      sellerAddress,
      bidClosingTime: closingTime,
    });

    res.status(200).send({
      success: true,
      message: "Successfully posted bid",
      bid,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while posting bid",
      error,
    });
  }
};

export const fetchAllBidsController = async (req, res) => {
  try {
    const bid = await bidModel.find({}).sort({ updatedAt: -1 });

    res.status(200).send({
      success: true,
      message: "Successfully fetch all bids",
      bid,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while fetching all bids",
      error,
    });
  }
};

export const fetchUserBidsController = async (req, res) => {
  try {
    const bid = await bidModel
      .find({
        $or: [{ seller: req.user._id }, { buyer: { $in: [req.user._id] } }],
      })
      .sort({ updatedAt: -1 });

    res.status(200).send({
      success: true,
      message: "Successfully fetch individual user bids",
      bid,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while fetching user bids",
      error,
    });
  }
};

export const fetchSingleBidController = async (req, res) => {
  try {
    const { bid } = req.params;

    const singleBid = await bidModel.findOne({ _id: bid });

    res.status(200).send({
      success: true,
      message: "Successfully fetch single bid",
      singleBid,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while fetching single bid",
      error,
    });
  }
};

export const updateBidAndTransactionDetails = async (req, res) => {
  try {
    const { buyerAddress, pricePerToken, energyTokensToSell, id } = req.body;

    if (!buyerAddress || !pricePerToken) {
      return res.status(400).send({
        success: false,
        message: "Please fill all the fields",
      });
    }

    const bid = await bidModel.findOne({ _id: id });

    if (bid.seller.equals(req.user._id)) {
      return res.status(400).send({
        success: false,
        message: "You can't buy from your own listing.",
      });
    }

    if (bid.buyerAddress === "" && bid.pricePerToken > pricePerToken) {
      return res.status(400).send({
        success: false,
        message: "Your bid must be higher than or equal to current bid",
      });
    }

    if (bid.buyerAddress && bid.pricePerToken >= pricePerToken) {
      return res.status(400).send({
        success: false,
        message: "Your bid must be higher than current bid",
      });
    }

    const updatedBid = await bidModel.findByIdAndUpdate(
      { _id: id },
      {
        $push: { buyer: req.user._id },
        buyerAddress,
        pricePerToken,
        totalCost: pricePerToken * energyTokensToSell,
      },
      { new: true }
    );

    // Create transaction of buyer

    const newTransaction = await new transactionModel({
      transactionBid: id,
      buyer: req.user._id,
      biddingPrice: pricePerToken,
      totalCost: pricePerToken * energyTokensToSell,
    });

    await newTransaction.save();

    res.status(200).send({
      success: true,
      message: "You have successfully placed a bid",
      updatedBid,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while updating bid details",
      error,
    });
  }
};

export const filterBidsController = async (req, res) => {
  try {
    const { searchUnits } = req.body;

    const bids = await bidModel
      .find({
        energyTokensToSell: { $gte: searchUnits },
      })
      .sort({ energyTokensToSell: 1 });

    res.status(200).send({
      success: true,
      message: "Successfully filter bids",
      bids,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while filtering bids",
      error,
    });
  }
};

export const updateBidTransactionStatusController = async (req, res) => {
  try {
    const bid = await bidModel.findById({ _id: req.params.bid });

    if (bid.isAccepted) {
      return res.status(400).send({
        success: false,
        message: "bid already accepted",
      });
    }

    // find transaction to get accepted

    const transactionToGetAccepted = await transactionModel
      .findOne({
        transactionBid: req.params.bid,
      })
      .sort({ totalCost: -1 });

    // accepted transaction with highest bid

    const transactionAccepted = await transactionModel.findByIdAndUpdate(
      { _id: transactionToGetAccepted._id },
      { transactionStatus: "Accepted" },
      { new: true }
    );

    // rest all not accepted

    await transactionModel.updateMany(
      { transactionBid: req.params.bid, _id: { $ne: transactionAccepted._id } },
      { transactionStatus: "Not Accepted" }
    );

    // update the bid status to accepted

    const acceptBid = await bidModel.findByIdAndUpdate(
      { _id: req.params.bid },
      { isAccepted: true },
      { new: true }
    );

    // adding highest bidding cost from buyer wallet to seller wallet and energy tokens from seller wallet to buyer wallet

    await walletModel.findOneAndUpdate(
      { user: req.user._id },
      {
        $inc: {
          accountBalance: bid.totalCost,
          availableEnergyTokens: -bid.energyTokensToSell,
        },
      }
    );

    await walletModel.findOneAndUpdate(
      { user: transactionAccepted.buyer },
      {
        $inc: {
          accountBalance: -bid.totalCost,
          availableEnergyTokens: bid.energyTokensToSell,
        },
      }
    );

    res.status(200).send({
      success: true,
      message: "Transaction started successfully",
      acceptBid,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while starting transaction",
      error,
    });
  }
};
