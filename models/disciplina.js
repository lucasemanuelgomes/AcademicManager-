let mongoose = require("mongoose");
const Tarefa = require("./tarefa.js");

let disciplinaSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  descricao: { type: String },
  dataInicial: { type: Date, default: Date.now },
  dataFinal: { type: Date },
  tarefas: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tarefa" }],
});

module.exports = mongoose.model("Disciplina", disciplinaSchema);