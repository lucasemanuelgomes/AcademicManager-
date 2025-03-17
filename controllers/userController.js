const User = require("../models/user.js");
const tokenService = require("jsonwebtoken");

const createUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "email e password são obrigatórios." });
  }
  try {
    const newUser = new User({
      email,
      password,
    });

    await newUser.save();
    res
      .status(201)
      .json({ message: "Usúario criado com sucesso", data: newUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao criar Usúario", error: error.message });
  }
};

const obterUsers = async (req, res) => {
  try {
    const users = await users.find()
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erro no servidor!" });
  }
};


const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;

    const deleteUser = await User.findOneAndDelete({ userID: id });

    if (!deleteUser) {
      return res.status(404).json({ msg: "Usuario não encontrado." });
    }

    res.status(200).json({ msg: "Usuario deletado com sucesso" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Erro no servidor." });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    if (password !== user.password) {
      return res.status(401).json({ message: "Credenciais inválidas" });
    }

    const { __v, _id, ...json } = user.toObject();
    const token = await tokenService.sign(json, process.env.SECRET);

    return res
      .status(200)
      .json({ message: "Usuario encontrado com sucesso", token: token });
  } catch (err) {
    res.status(500).json({ message: "Erro no servidor" });
  }
};

module.exports = { createUser, deleteUser, login, obterUsers };
