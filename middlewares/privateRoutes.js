const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("auth-token");

  if (token === null) {
    return res.status(401).json({ msg: "No Token Found" });
  }

  try {
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verifiedToken;
    next();
  } catch (err) {
    res.status(400).json({ msg: "Invalid Token" });
  }
};
