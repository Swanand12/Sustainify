import { useState, createContext, useContext } from "react";

const WalletContext = createContext();

const WalletProvider = ({ children }) => {
  const [connectWallet, setConnectWallet] = useState({
    status: false,
    accountAddress: null,
  });
  const [walletState, setWalletState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });

  return (
    <WalletContext.Provider
      value={{ connectWallet, setConnectWallet, walletState, setWalletState }}
    >
      {children}
    </WalletContext.Provider>
  );
};

const useWallet = () => useContext(WalletContext);

export { useWallet, WalletProvider };
