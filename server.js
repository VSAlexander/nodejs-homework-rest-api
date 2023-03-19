const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = require("./app");

dotenv.config();

const { DB_URL, PORT = 3000 } = process.env;

mongoose
  .connect(DB_URL)
  .then(() =>
    app.listen(PORT, () => {
      console.log("Database connection successful");
    })
  )
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });
