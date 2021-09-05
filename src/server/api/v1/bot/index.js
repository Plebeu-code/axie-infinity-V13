const { Router } = require("express");
const client = require("../../../../../");
const router = Router();

router.get("/", (req, res) => {
  res.json({
    message: "bot side",
  });
});

router.get("/servers", (req, res) => {
  let guilds = client.guilds.cache.map((guild) => {
    return { name: guild.name, id: guild.id, memberCount: guild.memberCount };
  });
  res.json(guilds);
});

module.exports = router;
