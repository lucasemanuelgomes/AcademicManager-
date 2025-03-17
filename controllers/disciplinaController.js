const Disciplina = require("../models/disciplina.js");

const criarDisciplina = async (req, res) => {
  const { nome, descricao, dataInicial, dataFinal, idTarefas } = req.body;

  if (!nome || !descricao || !dataInicial || !dataFinal || !idTarefas) {
    return res.status(400).json({
      message:
        "nome, descricao, dataInicial, dataFinal, idTarefas são obrigatórios",
    });
  }

  if (!Array.isArray(idTarefas)) {
    return res.status(400).json({
      message: "idTarefas precisa ser um array",
    });
  }
  try {
    const newDisciplina = new Disciplina({
      nome,
      descricao,
      dataInicial,
      dataFinal,
      tarefas: idTarefas,
    });

    await newDisciplina.save();

   
    await Tarefa.updateMany(
      { _id: { $in: idTarefas } },
      { $push: { disciplinas: newDisciplina._id } }
    );

    res.status(201).json({
      message: "Disciplina criada com sucesso!",
      disciplina: newDisciplina,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erro no servidor!" });
  }
};

const obterDisciplinas = async (req, res) => {
  try {
    const disciplinas = await Disciplina.find().populate("tarefas");
    res.status(200).json(disciplinas);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erro no servidor!" });
  }
};

const excluirDisciplina = async (req, res) => {
  try {
    const { id } = req.params;

    await Disciplina.deleteOne({ _id: id });
    res.status(200).json({ message: "Disciplina removida com sucesso!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erro no servidor!" });
  }
};

const editarDisciplina = async (req, res) => {
  const { id } = req.params;
  const { nome, descricao, dataInicial, dataFinal, idTarefas } = req.body;

  if (!nome || !descricao || !dataInicial || !dataFinal || !idTarefas) {
    return res.status(400).json({
      message:
        "Os campos: nome, descricao, dataInicial, dataFim, idTarefas são obrigatórios",
    });
  }

  if (!Array.isArray(idTarefas)) {
    return res.status(400).json({
      message: "idTarefas precisa ser um array",
    });
  }

  try {
    let disciplina = await Disciplina.findByIdAndUpdate(id, {
      nome,
      descricao,
      dataInicial,
      dataFinal,
      tarefas: idTarefas,
    });
    res.status(200).json({
      message: "Disciplina atualizada com sucesso!",
      disciplina,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erro no servidor!" });
  }
};

module.exports = {
  criarDisciplina,
  obterDisciplinas,
  excluirDisciplina,
  editarDisciplina,
};
