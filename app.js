const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const verifyApiKey = require("./middlewares/verifyApiKey");
const privateRoutes = require("./middlewares/privateRoutes");

dotenv.config();

const app = express();

app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use("/api/auth", verifyApiKey, require("./api/auth"));
app.use("/api/auth", privateRoutes, require("./api/posts"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
