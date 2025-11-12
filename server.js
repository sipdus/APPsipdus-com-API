const express = require('express');
const cors = require('cors');

const app = express();

// 🟢 Middlewares
app.use(express.json());
app.use(cors());

// 🟢 Importar rotas
const alimentosRoutes = require('./APIsipdus/routes/alimentosRoutes');
const refeicoesRoutes = require('./APIsipdus/routes/refeicoesRoutes');
const medicoesRoutes = require('./APIsipdus/routes/medicoesRoutes');
const usuariosRoutes = require('./APIsipdus/routes/usuariosRoutes');

// 🟢 Usar rotas com prefixos padronizados
app.use('/alimentos', alimentosRoutes);
app.use('/refeicoes', refeicoesRoutes);
app.use('/medicoes', medicoesRoutes);
app.use('/usuarios', usuariosRoutes); // ✅ rotas /usuarios/register, /usuarios/login etc.

// 🟢 Endpoint raiz para teste
app.get('/', (req, res) => {
  res.send('✅ API SIPDUS está rodando!');
});

// 🟢 Exportar o app para o Vercel
module.exports = app;

// 🟢 Rodar localmente (node server.js)
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  });
}
