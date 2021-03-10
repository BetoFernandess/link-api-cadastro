const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json


app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));





const db = require("./app/models");



db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Conectado ao banco de dados!");
  })
  .catch(err => {
    console.log("Nao foi possível conectar ao banco de dados!", err);
    process.exit();
  });

// simple route



require("./app/routes/routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 7070;
app.listen(PORT, () => {
  console.log(`Servidor funcionando na porta ${PORT}.`);
});
