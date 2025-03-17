const express = require('express');
const app = express();
const dotenv = require('dotenv');
const alunoRouter = require('./routes/alunoRoutes.js');
const disciplinaRouter = require('./routes/disciplinaRoutes.js');
const perfilRouter = require('./routes/perfilRoutes.js');
const professorRouter = require('./routes/professorRoutes.js');
const tarefaRouter = require('./routes/tarefaRoutes.js');
const turmaRouter = require('./routes/turmaRoutes.js');
const userRouter = require('./routes/userRoutes.js');
const middleWare = require('./middleWare.js')
const db = require('./database/db.js');

dotenv.config();

app.use(express.json());
app.use(middleWare);
app.use('/api', userRouter);
app.use('/api', alunoRouter);
app.use('/api', disciplinaRouter);
app.use('/api', perfilRouter);
app.use('/api', professorRouter);
app.use('/api', tarefaRouter);
app.use('/api', turmaRouter);

app.listen(process.env.PORT, () => {
    console.log('O servidor está rodando na porta: ' + process.env.PORT)
});


