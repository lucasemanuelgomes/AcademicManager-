const Turma = require("../models/turma.js");

const criarTurma = async (req, res) => {
  const { nome, idAluno, idProfessor } = req.body;

  if (!nome || !idAluno || !idProfessor) {
    return res.status(400).json({
      message: "nome, idAluno e idProfessor são obrigatórios.",
    });
  }

  try {
    const newTurma = new Turma({
      nome,
      alunos: idAluno,
      professor: idProfessor,
    });

    await newTurma.save();

    res.status(201).json({
      message: "Turma criada com sucesso!",
      turma: newTurma,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erro no servidor!" });
  }
};

const obterTodasTurmas = async (req, res) => {
  try {
    const turmas = await Turma.find().populate("alunos, professor");
    res.status(200).json(turmas);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erro no servidor!" });
  }
};

const excluirTurma = async (req, res) => {
  try {
    const { id } = req.params;

    await Turma.deleteOne({ _id: id });
    res.status(200).json({ message: "Turma excluida com sucesso!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erro no servidor!" });
  }
};

const editarTurma = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, idAluno, idProfessor } = req.body;

    let turma = await Turma.findByIdAndUpdate(id, {
      nome,
      alunos: idAluno,
      professor: idProfessor,
    });
    res.status(200).json({
      message: "Turma atualizada com sucesso!",
      turma,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erro no servidor!" });
  }
};

module.exports = { criarTurma, obterTodasTurmas, excluirTurma, editarTurma };
