const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const colors = require("colors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

//env config
dotenv.config();

//Router import
const userRoutes = require("./Routes/userRoutes");

//mongodb connection
connectDB();

// rest Object

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/api/v1/user", userRoutes);

//routes

app.get("/", (req, res) => {
  res.status(200).json({
    message: "success",
  });
});

// Port
const PORT = process.env.PORT || 8080;
app.listen(8080, () => {
  console.log(
    `Server Running on ${process.env.DEV_MODE} on port ${PORT}`.bgCyan.white
  );
});
