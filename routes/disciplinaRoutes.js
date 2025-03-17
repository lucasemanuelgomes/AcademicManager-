const express = require("express");
const router = express.Router();
const disciplinaController = require("../controllers/disciplinaController.js");

router.get("/disciplina", disciplinaController.obterDisciplinas);
router.post("/disciplina", disciplinaController.criarDisciplina);
router.delete("/disciplina/:id", disciplinaController.excluirDisciplina);
router.put("/disciplina/:id", disciplinaController.editarDisciplina);

module.exports = router;