const express = require("express");
const router = express.Router();
const turmaController = require("../controllers/turmaController.js");

router.get("/turma", turmaController.obterTodasTurmas);
router.post("/turma", turmaController.criarTurma);
router.delete("/turma/:id", turmaController.excluirTurma);
router.put("/turma/:id", turmaController.editarTurma);

module.exports = router;