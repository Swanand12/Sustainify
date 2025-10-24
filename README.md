# 🌱 Sustainify

![License](https://img.shields.io/badge/license-MIT-green)  ![Build](https://img.shields.io/badge/build-passing-brightgreen)  ![Stack](https://img.shields.io/badge/stack-MERN%20%2B%20Blockchain-blue)

**Sustainify** is a peer-to-peer platform that enables **decentralized, sustainable energy transfer** between individuals and communities. It leverages blockchain (Solidity + Hardhat), a MERN backend, and an IoT prototype to create a transparent, secure, and efficient energy-sharing marketplace.

Users (prosumers) can produce, bid, trade, and consume renewable energy locally, reducing dependency on centralized grids and promoting greener, community-driven energy practices.

---

## ✨ Key Features

* 🔗 **Blockchain Smart Contracts** — Secure P2P transactions implemented in Solidity and tested with Hardhat.
* 📊 **Interactive Dashboard** — Real-time energy production, bidding activity, transaction history, and wallet balances.
* ⚡ **IoT Prototype Integration** — Solar panel + battery + load demo + IOT device that demonstrates real energy generation and consumption linked to the app.
* 💰 **Peer-to-Peer Marketplace** — Prosumers list energy, buyers place bids, and on-chain transactions settle trades.
* 🔐 **Auth & Wallet Management** — Secure authentication, wallet top-up flow, and bid/transaction tracking.
* ♻️ **Decentralized & Transparent** — Auditable on-chain records and low-cost micro-transactions.

---

## 🛠 Tech Stack

* **Frontend:** React (Vite) + Tailwind CSS
* **Backend:** Node.js + Express
* **Database:** MongoDB
* **Blockchain:** Solidity + Hardhat + Ethers.js
* **IoT:** Solar panel, battery, ESP32, Arduino UNO, current and voltage sensors, relay module, and RTC to simulate real-time energy generation, monitoring, and automated switching.

---

## 📂 Folder Structure

```
├── README.md
├── backend
│   ├── config
│   │   └── db.js
│   ├── controllers
│   │   ├── authController.js
│   │   ├── bidController.js
│   │   ├── transactionController.js
│   │   └── walletController.js
│   ├── helpers
│   │   └── authHelper.js
│   ├── middlewares
│   │   └── authMiddleware.js
│   ├── models
│   │   ├── authModel.js
│   │   ├── bidModel.js
│   │   ├── transactionModel.js
│   │   └── walletModel.js
│   ├── routes
│   │   ├── authRoute.js
│   │   ├── bidRoute.js
│   │   ├── transactionRoute.js
│   │   └── walletRoute.js
│   └── server.js
│
├── blockchain
│   ├── contracts
│   │   ├── Lock.sol
│   │   └── Transactions.sol
│   ├── ignition
│   │   └── modules
│   │       ├── Lock.js
│   │       └── Transactions.js
│   ├── hardhat.config.js
│   └── test
│       └── Lock.js
│
└── frontend
    ├── src
    │   ├── pages
    │   ├── components
    │   ├── context
    │   ├── contractJson
    │   └── assets
    ├── vite.config.js
    └── index.html
```

---

## ⚙️ Local Development & Setup

> These steps assume you have Node.js (>=16), npm, and MongoDB installed. For Hardhat, make sure you have `npx` available.

### 1. Clone the repo

```bash
git clone https://github.com/your-username/sustainify.git
cd sustainify
```

### 2. Backend

```bash
cd backend
npm install
# configure .env (MONGO_URI, JWT_SECRET, PORT)
npm run dev
```

### 3. Blockchain (Hardhat)

```bash
cd ../blockchain
npm install
npx hardhat compile
# run tests
npx hardhat test
# spawn a local node
npx hardhat node
# deploy to local node (example script path)
npx hardhat run scripts/deploy.js --network localhost
```

> After deployment, copy the deployed contract address and ABI into `frontend/src/contractJson/Transactions.json` (or update frontend config to point to the local network).

### 4. Frontend

```bash
cd ../frontend
npm install
# configure frontend env (REACT_APP_API_URL, CONTRACT_ADDRESS, RPC_URL)
npm run dev
```

---

## 🔁 Typical Workflow

1. Prosumers register & connect a wallet.
2. Prosumers publish energy offers (kWh) with minimum price.
3. Consumers browse active offers and place bids.
4. Matching & settlement occur via the `Transactions.sol` smart contract.
5. Backend updates off-chain records and dashboards for analytics.

---

## 📸 Prototype & Demo

### Prototype
<img width="691" height="361" alt="IMG20250424104128-removebg-preview (1)" src="https://github.com/user-attachments/assets/11835259-879b-4266-b7ce-a902d530c205" />

### Hero Page
<img width="1920" height="1029" alt="Screenshot (169)" src="https://github.com/user-attachments/assets/d41f617f-63a7-4a93-bf8e-fd5dc7f5a4c3" />

### Dashboard
<img width="1919" height="1026" alt="Screenshot 2025-04-23 143942" src="https://github.com/user-attachments/assets/95d2daa1-d710-4389-8961-999c4d05d039" />

---

## 🔮 Roadmap & Future Work

* Integrate with real smart meters and utility-grade IoT devices.
* Add stablecoin-based micropayments and settlement channels.
* Implement on-chain reputation & dispute resolution for trust.
* Expand market to cross-community trading and grid-balancing features.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a feature branch: `git checkout -b feat/your-feature`.
3. Commit your changes: `git commit -m "feat: add ..."`.
4. Push and open a Pull Request.

Please open issues for bugs, features, or questions.

---

## 🏷 License

This project is licensed under the **MIT License**. See `LICENSE` for details.

---

*By the People, For the Planet.*

