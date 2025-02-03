import walletModel from "../models/walletModel.js";

export const postWalletValues = async (req, res) => {
  try {
    const { availableEnergyTokens, accountBalance } = req.body;

    const wallet = await walletModel.create({
      user: req.user._id,
      availableEnergyTokens,
      accountBalance,
    });

    res.status(200).send({
      success: true,
      message: "Successfully Posted Wallet Values",
      wallet,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while posting wallet values",
      error,
    });
  }
};

export const getWalletValues = async (req, res) => {
  try {
    const wallet = await walletModel.findOne({
      user: req.user._id,
    });

    if (!wallet) {
      return res.status(400).send({
        success: false,
        message: "Please connect wallet first ",
      });
    }

    res.status(200).send({
      success: true,
      message: "Successfully Fetched Wallet Values",
      wallet,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while fetching wallet values",
      error,
    });
  }
};
