const express = require("express");
const ravMesserRoutes = require("./routes/ravMesser.js");

require("dotenv").config();

const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

// Routes
app.use("/ravmesser", ravMesserRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
