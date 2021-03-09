module.exports = mongoose => {

  var schema = mongoose.Schema({
    uuid:mongoose.ObjectId,
    user_id: mongoose.ObjectId,
    name: String,
    birthdate: Date,
    phone: String,
    cep: String,
    info: String,
    email: String,

    login: String,
    pass: String,
<<<<<<< HEAD
    active: Boolean,

    type:String
=======
    active: Boolean
>>>>>>> e028a2a73736f87d3d9e932f8d55522927ccbc15

  },
    {
      timestamps: true
    });

  

  const user = mongoose.model("user", schema);

  return user;

};
