const express = require("express");
const cors = require("cors");
const auth = require("./routes/auth");
const userRouter = require("./routes/users");
const mongoose = require("mongoose");
const { urlencoded } = require("express");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

const uri = process.env.atlasUri;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB connection established successfully......");
});
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);
app.use("/auth", auth);
// app.use("/logging");
// app.use("/register");

app.get("/", (req, res) => {
  res.json({ message: "hello world " });
});

app.listen(port, () => {
  console.log(`Server is running on Port: ${port}`);
});
