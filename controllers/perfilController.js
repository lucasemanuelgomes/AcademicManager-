const Perfil = require("../models/perfil.js");
const Aluno = require("../models/aluno.js");

const criarPerfil = async (req, res) => {
  const { matricula, telefone, endereco, idAluno } = req.body;

  if (!matricula || !telefone || !endereco || !idAluno) {
    return res.status(400).json({
      message:
        "matricula, telefone, endereco, idAluno são obrigatórios",
    });
  }
  try {
    const newPerfil = new Perfil({
      matricula,
      telefone,
      endereco,
      aluno: idAluno,
    });

    await newPerfil.save();

    await Aluno.updateOne(
      { id: idAluno },
      { $set: { perfil: newPerfil.id } }
    );

    res.status(201).json({
      message: "Perfil criado com sucesso!",
      perfil: newPerfil,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erro no servidor!" });
  }
};

const obterPerfis = async (req, res) => {
  try {
    const perfis = await Perfil.find().populate("aluno");
    res.status(200).json(perfis);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erro no servidor!" });
  }
};

const excluirPerfil = async (req, res) => {
  try {
    const { id } = req.params;

    await Perfil.deleteOne({ _id: id });
    res.status(200).json({ message: "Perfil excluido com sucesso!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erro no servidor!" });
  }
};

const editarPerfil = async (req, res) => {
  const { id } = req.params;
  const { matricula, telefone, endereco, idAluno } = req.body;

  if (!matricula || !telefone || !endereco || !idAluno) {
    return res.status(400).json({
      message:
        "Os campos: matricula, telefone, endereco, idAluno são obrigatórios",
    });
  }
  try {
    let perfil = await Perfil.findByIdAndUpdate(id, {
      matricula,
      telefone,
      endereco,
      aluno: idAluno,
    });
    res.status(200).json({
      message: "Perfil atualizado com sucesso!",
      perfil,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erro no servidor!" });
  }
};

module.exports = { criarPerfil, obterPerfis, excluirPerfil, editarPerfil };
