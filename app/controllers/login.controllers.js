const db = require("../models");
const bcrypt = require('bcrypt');
const loginModel = require("../models/login.model");
const mongoose = require('mongoose');


const saltRounds = 15;


const User = db.users;
const Login = db.login;



exports.login = (req, res) => {

  console.log(req.headers)

  const pass = req.body.pass;
  const login_name = req.body.login;

  var condition = login_name ? { login: { $regex: new RegExp(login_name), $options: "i" } } : {};

  User.findOne(condition)
    .then(data => {
      if (data) {

        const uuid = data.uuid

        result = bcrypt.compareSync(pass + login_name, data.pass)

        if (result) {


          Login.findOne({ auth_uuid: uuid }).
            then(data => {
              if (data) {
                res.status(409).send(
                  {
                    message: "Usuário já logado"
                  }
                );
              }
              else {
                console.log(uuid)
                const login = new Login({ auth_uuid: uuid });


                login.save(login)
                  .then(data => {
                    res.send(data);
                  })
                  .catch(err => {
                    res.status(500).send({
                      message:
                        err.message || "Ocorreu um erro ao criar o login do usuário"
                    });
                  })
              }
            })


        }

        else {
          res.status(401).send(
            {
              message: "Login ou senha incorretos"
            }
          )
        }

      }
      else {
        res.status(404).send(
          {
            message: "Usuário não encontrado"
          }
        )
      }


    }).catch(err => {
      res.status(500).send({
        message:
          err.message || "Erro ao recuperar o usuário"
      });
    });

}


exports.logout = (req, res) => {
  const auth_id = req.params.auth_id;

  var user_login = auth_id ? { auth_uuid: { $regex: new RegExp(auth_id), $options: "i" } } : {};

  Login.findOneAndRemove(user_login)
    .then(data => {
      console.log(data);
      if (!data) {
        res.status(404).send({
          message: `Não é possível deslogar o usuário de ID ${auth_id} porque este não está logado.`
        });
      } else {
        res.send({
          message: "Logut feito com sucesso."
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Erro ao fazer o logout do usuário de ID:" + id
      });
    });
}
