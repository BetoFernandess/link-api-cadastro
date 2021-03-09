module.exports = mongoose => {

    const Login = mongoose.model(
        "login",
        mongoose.Schema({
            auth_uuid: String,
<<<<<<< HEAD
            
=======
>>>>>>> e028a2a73736f87d3d9e932f8d55522927ccbc15

        },
            {
                timestamps: true
            })
    );
    return Login;

};
