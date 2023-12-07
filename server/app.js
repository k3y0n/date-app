const express = require("express");
const chalk = require("chalk");
const config = require("config");
const mongoose = require("mongoose");
const initDataBase = require("./startApp/initDatabase.js");

const app = express();
const PORT = config.get("PORT") ?? 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

if (process.env.NODE_ENV === "production") {
  console.log("start prod mode");
} else {
  console.log("start dev mode");
}

const start = async () => {
  try {
    mongoose.connection.once("open", () => {
      initDataBase();
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
