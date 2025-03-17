const Aluno = require("../models/aluno.js");

const criarAluno = async (req, res) => {
  const { nome, idade } = req.body;

  if (!nome || !idade) {
    return res
      .status(400)
      .json({ message: "nome e idade são obrigatórios." });
  }
  try {
    const newAluno = new Aluno({
      nome,
      idade,
    });

    await newAluno.save();

    res.status(201).json({
      message: "O aluno foi criado com sucesso!",
      aluno: newAluno,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erro no servidor!" });
  }
};

const obterAlunos = async (req, res) => {
  try {
    const alunos = await Aluno.find().populate("perfil");
    res.status(200).json(alunos);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erro no servidor!" });
  }
};

const excluirAluno = async (req, res) => {
  try {
    const { id } = req.params;

    await Aluno.deleteOne({ _id: id });
    res.status(200).json({ message: "Aluno removido com sucesso!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erro no servidor!" });
  }
};

const editarAluno = async (req, res) => {
  const { id } = req.params;
  const { nome, idade } = req.body;

  if (!nome || !idade) {
    return res
      .status(400)
      .json({ message: "nome e idade são obrigatórios." });
  }
  try {
    let aluno = await Aluno.findByIdAndUpdate(id, { nome, idade });
    res.status(200).json({
      message: "Aluno atualizado com sucesso!",
      aluno,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erro no servidor!" });
  }
};

module.exports = { criarAluno, obterAlunos, excluirAluno, editarAluno };
