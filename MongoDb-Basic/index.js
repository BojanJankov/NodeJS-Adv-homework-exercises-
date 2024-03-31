import "dotenv/config";
import express from "express";
import { connectToDatabase } from "./src/db/database-connection.js";
import { globalRouter } from "./src/const/router.const.js";

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0";

app.use("/", globalRouter);

app.listen(PORT, HOST, () => {
  connectToDatabase();
  console.log(`Server is up at port: ${PORT}`);
});
