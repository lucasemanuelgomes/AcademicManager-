const Tarefa = require("../models/tarefa.js");

const criarTarefa = async (req, res) => {
  const { titulo, idALuno, idDisciplina } = req.body;

  if (!titulo || !idALuno || !idDisciplina) {
    return res.status(400).json({
      message: "titulo, idALuno e idDisciplina são obrigatórios.",
    });
  }

  if (!Array.isArray(idDisciplina)) {
    return res.status(400).json({
      message: "idDisciplina precisa ser um array",
    });
  }

  const concluida = false;

  try {
    const newTarefa = new Tarefa({
      titulo,
      aluno: idALuno,
      concluida,
      disciplinas: idDisciplina,
    });

    await newTarefa.save();

    res.status(201).json({
      message: "Tarefa criada com sucesso!",
      tarefa: newTarefa,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erro no servidor!" });
  }
};

const obterTodasTarefas = async (req, res) => {
  try {
    const tarefas = await Tarefa.find()
      .populate("aluno")
      .populate("disciplinas");
    res.status(200).json(tarefas);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erro no servidor!" });
  }
};

const deletarTarefa = async (req, res) => {
  try {
    const { id } = req.params;

    await Tarefa.deleteOne({ _id: id });
    res.status(200).json({ message: "Tarefa removida com sucesso!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erro no servidor!" });
  }
};

const editarTarefa = async (req, res) => {
  const { id } = req.params;
  const { titulo, concluida } = req.body;

  if (!titulo || !concluida) {
    return res
      .status(400)
      .json({ message: "Os campos: titulo e concluida são obrigatórios." });
  }

  try {
    let tarefa = await Tarefa.findByIdAndUpdate(id, { titulo, concluida });
    res.status(200).json({
      message: "Tarefa atualizada com sucesso!",
      tarefa,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erro no servidor!" });
  }
};

module.exports = {
  criarTarefa,
  obterTodasTarefas,
  deletarTarefa,
  editarTarefa,
};
