const { Router } = require("express");
const { knex: db } = require("../../../../database/controls/db_controls");
const router = Router();

router.get("/", (req, res) => {
  res.json({
    message: "database side",
  });
});

router.get("/alunos", async (req, res) => {
  let alunos = await db("alunos").select("*");
  res.json(alunos);
});

router.get("/scholarship", async (req, res) => {
  let scholarship = await db("scholarship").select("*");
  res.json(scholarship);
});

router.get("/resume", async (req, res) => {
  let scholarships = await db("scholarship").count({ scholarships: "id" }).first();
  let alunos = await db("alunos").count({ alunos: "id" }).first();

  res.json({
    ...scholarships,
    ...alunos,
  });
});

module.exports = router;
