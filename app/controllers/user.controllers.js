const db = require("../models");
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const saltRounds = 15;


const User = db.users;
const Login = db.login;

// Create and Save a new User
exports.register = (req, res) => {

  if (!req.body.name) {
    res.status(400).send({ message: "Conteúdo não pode ser vazio!!" });
    return
  }

  const hash = bcrypt.hashSync(req.body.pass + req.body.login, saltRounds);

  const user = new User({
    uuid: new mongoose.Types.ObjectId(),
    name: req.body.name,
    birthdate: req.body.birthdate,
    phone: req.body.phone,
    cep: req.body.cep,
    info: req.body.info,
    email: req.body.email,
    login: req.body.login,
    pass: hash,
<<<<<<< HEAD
    active: req.body.active ? req.body.active : true,
    type:"usuário"
=======
    active: req.body.active ? req.body.active : true
>>>>>>> e028a2a73736f87d3d9e932f8d55522927ccbc15
  });

  user
    .save(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocorreu um erro ao criar o usuário" + req.body.name
      });
    });
};

// Retrieve all User from the database.
exports.listUsers = (req, res) => {
  const auth_id = req.params.auth_id;

  var user_login = auth_id ? { auth_uuid: { $regex: new RegExp(auth_id), $options: "i" } } : {};

  Login.findOne(user_login).then(data => {
    if (!data) {
<<<<<<< HEAD
      res.status(400).send({ message: "Usuário deve se logar ou registrar primeiro" });
=======
      res.status(400).send({ message: "Usuário não logado" });
>>>>>>> e028a2a73736f87d3d9e932f8d55522927ccbc15
      return
    }


<<<<<<< HEAD
   

    var condition =  { type: { $regex: new RegExp("usuário"), $options: "i" } } ;
=======
    const name = req.query.name;

    var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};
>>>>>>> e028a2a73736f87d3d9e932f8d55522927ccbc15

    User.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Ocorreu um erro ao listar os usuários"
        });
      });


  }).catch(err => {
<<<<<<< HEAD
    
    res.status(500).send({
      message: "Erro ao encontrar o login do usuário de ID" + auth_id + ": " + err
=======
    const erro = User.findOne(user_login).exec() == undefined ? "usuário não existe" : "usuário não logou";
    res.status(500).send({
      message: "Erro ao encontrar o login do usuário de ID" + auth_id + ": " + erro
>>>>>>> e028a2a73736f87d3d9e932f8d55522927ccbc15
    });
  });
};



exports.update = (req, res) => {
  const auth_id = req.params.auth_id;

  var user_login = auth_id ? { auth_uuid: { $regex: new RegExp(auth_id), $options: "i" } } : {};

  Login.findOne(user_login).then(data => {

    if (!data) {
<<<<<<< HEAD
      res.status(400).send({ message: "Usuário deve se logar ou registrar primeiro" });
=======
      res.status(400).send({ message: "Usuário não logado" });
>>>>>>> e028a2a73736f87d3d9e932f8d55522927ccbc15
      return
    }


    if (!req.body) {
      return res.status(400).send({
        message: "O objeto a ser atualizado não pode ser vazio."
      });
    }

    const id = req.params.uuid;

<<<<<<< HEAD
    if (!uuid) {
      res.status(400).send({ message: "Não foi informado o id do usuário" });
      return
    }


=======
>>>>>>> e028a2a73736f87d3d9e932f8d55522927ccbc15
    User.findOneAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Não é possível atualizar o usuário de ID ${id} porque o usuário não foi encontrado`
          });
        } else res.send({ message: "Usuário atualizado com sucesso" });
      })
      .catch(err => {
        res.status(500).send({
          message: "Erro ao atualizar o usuário de ID:" + id
        });
      });

  }).catch(err => {
    const erro = User.findOne(user_login).exec() == undefined ? "usuário não existe" : "usuário não logou";
    res.status(500).send({
      message: "Erro ao encontrar o login do usuário de ID" + auth_id + ": " + err
    });
  });
};


// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  const auth_id = req.params.auth_id;

  var user_login = auth_id ? { auth_uuid: { $regex: new RegExp(auth_id), $options: "i" } } : {};

  Login.findOne(user_login).then(data => {
    if (!data) {
<<<<<<< HEAD
      res.status(400).send({ message: "Usuário deve se logar ou registrar primeiro" });
=======
      res.status(400).send({ message: "Usuário não logado" });
>>>>>>> e028a2a73736f87d3d9e932f8d55522927ccbc15
      return
    }



    const id = req.params.uuid;

<<<<<<< HEAD

    if (!uuid) {
      res.status(400).send({ message: "Não foi informado o id do usuário" });
      return
    }


=======
>>>>>>> e028a2a73736f87d3d9e932f8d55522927ccbc15
    User.findOneAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
<<<<<<< HEAD
            message: `Não é possível remover o usuário de ID ${id} porque o usuário não existe.`
=======
            message: `Não é possível remover do ID ${id} porque o usuário não existe.`
>>>>>>> e028a2a73736f87d3d9e932f8d55522927ccbc15
          });
        } else {
          res.send({
            message: "Remoção feita com sucesso."
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Erro  ao remover o ID:" + id
        });
      });

  }).catch(err => {
    res.status(500).send({
      message: "Erro ao encontrar o login do usuário de ID" + auth_id + ": " + err
    });
  });
};

