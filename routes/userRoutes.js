const express = require("express");
const router = express.Router();
const userController = require('../controllers/userController')

router.get('/user', userController.obterUsers)
router.post('/user', userController.createUser)
router.delete('/user/:id', userController.deleteUser)

router.post('/user/login', userController.login)


module.exports = router;