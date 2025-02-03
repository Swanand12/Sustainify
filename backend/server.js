import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import ConnectDB from "./config/db.js";
import authRoute from "./routes/authRoute.js";
import walletRoute from "./routes/walletRoute.js";
import bidRoute from "./routes/bidRoute.js";
import transactionRoute from "./routes/transactionRoute.js";

dotenv.config();

ConnectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/wallet", walletRoute);
app.use("/api/v1/bid", bidRoute);
app.use("/api/v1/transaction", transactionRoute);

app.get("/", (req, res) => {
  res.send({
    message: "This is Sustainifiers Server",
  });
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
