const express = require("express");
const cors = require("cors");
const authJS = require("./routes/userRoutes");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

const httpport = Number(process.env.PORT) || 5000;

mongoose                         
  .connect("mongodb://localhost:27017", {
  })
  .then(() => {
    console.log("DB CONNECTED");
    // Now that the database is connected, start the server
    const server = app.listen(httpport, () => {
      console.log(`server started ${httpport}`);
    });
  })
  .catch((err) => {
    console.log("DB ERROR", err.message);
  });

app.use("/api/auth", authJS);
app.get("/", (req, res) => {
  res.send("Hello, this is the root endpoint!");
});
