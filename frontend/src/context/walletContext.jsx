import { useState, createContext, useContext} from "react";

const WalletContext = createContext();

const WalletProvider = ({ children }) => {

   const [connectWallet, setConnectWallet] = useState(true);

   return <WalletContext.Provider value={{ connectWallet, setConnectWallet }}>{children}</WalletContext.Provider>;
};

const useWallet = () => useContext(WalletContext);

export { useWallet, WalletProvider };
