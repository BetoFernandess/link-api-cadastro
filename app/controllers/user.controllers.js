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

    active: req.body.active ? req.body.active : true,
    type:"usuário"

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
      res.status(400).send({ message: "Usuário deve se logar ou registrar primeiro" });

      return
    }


   

    var condition =  { type: { $regex: new RegExp("usuário"), $options: "i" } } ;

    const name = req.query.name;


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
    
    res.status(500).send({
      message: "Erro ao encontrar o login do usuário de ID" + auth_id + ": " + err

    });
  });
};



exports.update = (req, res) => {
  const auth_id = req.params.auth_id;

  var user_login = auth_id ? { auth_uuid: { $regex: new RegExp(auth_id), $options: "i" } } : {};

  Login.findOne(user_login).then(data => {

    if (!data) {
      res.status(400).send({ message: "Usuário deve se logar ou registrar primeiro" });
      return
    }


    if (!req.body) {
      return res.status(400).send({
        message: "O objeto a ser atualizado não pode ser vazio."
      });
    }

    const id = req.params.uuid;


    if (!uuid) {
      res.status(400).send({ message: "Não foi informado o id do usuário" });
      return
    }

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
      res.status(400).send({ message: "Usuário deve se logar ou registrar primeiro" });
      return
    }



    const id = req.params.uuid;



    if (!uuid) {
      res.status(400).send({ message: "Não foi informado o id do usuário" });
      return
    }


    User.findOneAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Não é possível remover o usuário de ID ${id} porque o usuário não existe.`
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


exports.createContact = (req, res) => {
  const auth_id = req.params.auth_id;
  const body = req.body


  var user_login = auth_id ? { auth_uuid: { $regex: new RegExp(auth_id), $options: "i" } } : {};

  Login.findOne(user_login).then(data => {

    if (!data) {

      res.status(400).send({ message: "Usuário deve se logar ou registrar primeiro" });
      res.status(400).send({ message: "Usuário não logado" });

      return
    }


    if (!body.name) {
      res.status(400).send({ message: "Conteúdo não pode ser vazio!!" });
      return
    }




    const user = new User({
      uuid: new mongoose.Types.ObjectId(),
      user_id: body.user_id ? new mongoose.Types.ObjectId(body.user_id) : undefined,
      name: body.name,
      birthdate: body.birthdate,
      phone: body.phone,
      cep: body.cep,
      info: body.info,
      email: body.email,

      active: body.active ? body.active : false,
      type:"contato"
    });

    user
      .save(user)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Ocorreu um erro ao criar o usuário" + body.name
        });
      });
  }).catch(err => {
    res.status(500).send({
      message: "Erro ao encontrar o login do usuário de ID" + auth_id + "\n" + err
    });
  });
};


exports.listContacts = (req, res) => {
  const auth_id = req.params.auth_id;

  var user_login = auth_id ? { auth_uuid: { $regex: new RegExp(auth_id), $options: "i" } } : {};



  Login.findOne(user_login).then(data => {

    console.log(data)
    if (!data) {

      res.status(400).send({ message: "Usuário deve se logar ou registrar primeiro" });
      res.status(400).send({ message: "Usuário não logado" });

      return
    }

    const user_id = req.params.user_id;


    if (!user_id) {
      res.status(400).send({ message: "Não foi informado o id do usuário" });
      return
    }

    var condition =  { user_id: user_id, type:"contato" };

    User.find(condition)
      .then(data => {
        
        if(data)
          res.send(data);
        else
          res.status(204).send(
            {
              message:"Não há contatos para o usuário dado"
            }
          )


    var condition = user_id ? { user_id: user_id } : { user_id: undefined };

    User.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Ocorreu um erro ao listar os usuários subordinados"
        });
      });

  }).catch(err => {
    res.status(500).send({
      message: "Erro ao encontrar o login do usuário de ID" + auth_id + "\n" + err
    });
  });
  });
};
