const express = require("express");
const router = express.Router();
const perfilController = require("../controllers/perfilController.js");

router.get("/perfil", perfilController.obterPerfis);
router.post("/perfil", perfilController.criarPerfil);
router.delete("/perfil/:id", perfilController.excluirPerfil);
router.put("/perfil/:id", perfilController.editarPerfil);

module.exports = router;