const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/humans", require("./routes/humanRoutes"));
app.use("/api/animals", require("./routes/animalRoutes"));

app.listen(5001, () => {
  console.log("Server running on port 5001 🚀");
});
