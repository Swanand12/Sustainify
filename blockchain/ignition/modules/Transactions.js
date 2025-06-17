const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("TransactionModule", (m) => {
  // Deploy Transactions contract
  const transactions = m.contract("Transactions");

  return { transactions };
});

// 0x5FbDB2315678afecb367f032d93F642f64180aa3
