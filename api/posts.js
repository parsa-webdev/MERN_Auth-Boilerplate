const router = require("express").Router();

router.get("/getuser", (req, res) => {
  res.json(req.user);
});

module.exports = router;
