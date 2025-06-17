require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
    },
  },
  solidity: "0.8.28",
  compilers: [
    { version: "0.8.28" },
    { version: "0.8.19" }, // Add other versions if needed
  ],
};
