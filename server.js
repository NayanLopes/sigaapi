const routes = require("./routes");
require('dotenv').config();
const express = require('express');


const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); //permite enviar dados em formato json 
app.use(routes);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});