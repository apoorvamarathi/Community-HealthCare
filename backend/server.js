const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
// app.use(express.json());
app.use(express.json({ strict: false }));


app.use("/api/humans", require("./routes/humanRoutes"));
app.use("/api/animals", require("./routes/animalRoutes"));
app.use("/api/analytics", require("./routes/analyticsRoutes"));

app.listen(5001, () => {
  console.log("Server running on port 5001 🚀");
});
