const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());

// import routes
const testRoute = require("./routes/test");
app.use("/test", testRoute);

app.get("/", (req, res) => {
  res.send("This is an example for Rest API");
});

// connect to DB
mongoose.connect(process.env.DB_CONNECTION, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("Connection established!!");
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
