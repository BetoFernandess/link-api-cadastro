module.exports = app => {
  
  const users = require("../controllers/user.controllers.js");
  const login = require("../controllers/login.controllers.js");


  var router = require("express").Router();


  //Rotas para controladores de login

    // Criação de um usuário
  router.post("/register", users.register);


  // Retorna todos os usuários cadastrados
  router.get("/:auth_id/userslist", users.listUsers);

  

  // Atualiza um usuário ou um contato, usando seu id
  router.put("/:auth_id/updateuser/:uuid", users.update);

  // Exclui um usuário ou um contato, usando seu id
  router.delete("/:auth_id/deleteuser/:uuid", users.delete);

  //Rotas para controladores de login

  //Login
  router.post("/login", login.login);

  // Retorna todos os contatos do usuário
  router.get("/:auth_id/usercontacts/:user_id/", login.listContacts);

  //Criação de um contato
  router.post("/:auth_id/createcontact/", login.createContact);

  //Logout
  router.delete("/:auth_id/logout", login.logout);

  

  // Create a new User
  router.post("/register", users.register);

  // Retrieve all users
  router.get("/:auth_id/userslist", users.listUsers);

  // Retrieve all id contacts users
  router.get("/:auth_id/usercontacts/:user_id", login.listContacts);


  router.post("/:auth_id/createcontact/", login.createContact);

  // Update a User with id
  router.put("/:auth_id/updateuser/:uuid", users.update);

  // Delete a User with id
  router.delete("/:auth_id/deleteuser/:uuid", users.delete);

  //Login
  router.post("/login", login.login);

  //Logout
  router.delete("/:auth_id/logout", login.logout);

    // Create a new User
  router.post("/register", users.register);

  app.use('', router);
};
