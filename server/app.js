import dotenv from "dotenv";
import express from "express";
import chalk from "chalk";
import config from "config";
import mongoose from "mongoose";
import { initDatabase } from "./startApp/initDatabase.js";
import router from "./routes/index.js";

dotenv.config();

const app = express();
const PORT = config.get("PORT") ?? 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", router);

if (process.env.NODE_ENV === "production") {
  console.log("start prod mode");
} else {
  console.log("start dev mode");
}

const start = async () => {
  try {
    mongoose.connection.once("open", () => {
      initDatabase();
    });

    await mongoose.connect(config.get("mongodb"));
    console.log(chalk.green(`Mongodb connected 💻`));

    app.listen(PORT, () => {
      console.log(chalk.green(`Server started on  port ⚡️:${PORT}`));
    });
  } catch (error) {
    console.error(chalk.red(`${error.message}`));
    process.exit(1);
  }
};

start();
