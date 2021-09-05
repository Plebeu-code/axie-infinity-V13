const { Router } = require("express");
const bot = require("./bot");
const database = require("./database");
const router = Router();

router.get("/", (req, res) => {
  res.json({
    message: "API - By Crowrvo",
    version: "v1.0.0",
    status: "Online",
  });
});

router.use("/bot", bot);
router.use("/database", database);

module.exports = router;
