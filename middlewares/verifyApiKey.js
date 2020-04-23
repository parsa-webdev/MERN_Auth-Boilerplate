const dotenv = require("dotenv");
dotenv.config();

module.exports = (req, res, next) => {
  const key = req.header("x-api-key");

  if (key === null) {
    return res.status(401).json({ msg: "No Security Key Provided" });
  }
  // if (key !== "A7ZD70AH55WN5LU3R3TW") {
  //   return res.status(401).json({ msg: "Security Key Does Not Match" });
  // }
  next();
};
