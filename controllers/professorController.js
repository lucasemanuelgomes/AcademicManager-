const Professor = require("../models/professor.js");

const criarProfessor = async (req, res) => {
  const { nome, idade, idDisciplina } = req.body;

  if (!nome || !idade || !idDisciplina) {
    return res.status(400).json({
      message: "nome, idade e idDisciplina são obrigatórios.",
    });
  }

  if (!Array.isArray(idDisciplina)) {
    return res.status(400).json({
      message: "idDisciplina precisa ser um array",
    });
  }

  try {
    const newProfessor = new Professor({
      nome,
      idade,
      disciplinas: idDisciplina,
    });

    await newProfessor.save();

    res.status(201).json({
      message: "Professor criado com sucesso!",
      professor: newProfessor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erro no servidor!" });
  }
};

const obterProfessores = async (req, res) => {
  try {
    const professores = await Professor.find().populate("disciplinas");
    res.status(200).json(professores);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erro no servidor!" });
  }
};

const excluirProfessores = async (req, res) => {
  try {
    const { id } = req.params;

    await Professor.deleteOne({ _id: id });
    res.status(200).json({ message: "Professor removido com sucesso!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erro no servidor!" });
  }
};

const editarProfessor = async (req, res) => {
  const { id } = req.params;
  const { nome, idade, idDisciplina } = req.body;

  if (!nome || !idade || !idDisciplina) {
    return res.status(400).json({
      message: "nome, idade e idDisciplina são obrigatórios.",
    });
  }

  if (!Array.isArray(idDisciplina)) {
    return res.status(400).json({
      message: "idDisciplina precisa ser um array",
    });
  }

  try {
    let professor = await Professor.findByIdAndUpdate(id, {
      nome,
      idade,
      disciplinas: idDisciplina,
    });
    res.status(200).json({
      message: "Professor atualizado com sucesso!",
      professor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erro no servidor!" });
  }
};

module.exports = {
  criarProfessor,
  obterProfessores,
  excluirProfessores,
  editarProfessor,
};
