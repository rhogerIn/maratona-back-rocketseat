const express = require("express");
const routes = require("./routes");
const server = express();
const path = require("path")

server.set('view engine', 'ejs')

//Alterar a localização da pasta views
server.set('views', path.join(__dirname, 'views'));

//Habilitar req.body
server.use(express.urlencoded({ extended: true }));

//Função padrão do express para chamar arquivos estáticos.
server.use(express.static("public"));

// Fluxo request e response
server.use(routes);


server.listen(3000, () => console.log("Server Running"));