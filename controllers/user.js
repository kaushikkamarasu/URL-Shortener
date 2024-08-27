const User = require("../models/user");
const {v4: uuidv4}= require('uuid');
const {setUser} = require("../service/auth");


async function handleUserSignup(req,res){

    const {name,email,password}= req.body;
    console.log("This was accessed");
    await User.create({
        name: name,
        email: email,
        password: password,
    });
    return res.redirect("/");

}

async function handleUserLogin(req,res){

    const {email,password}= req.body;
    const result = await User.findOne({email, password});
    console.log('User : ',result);
    if(!result) return res.render("login",{
        error : "Invalid Username or password",
    });
    const token = setUser(result);
    res.cookie('token',token);
    return res.redirect("/");

}

module.exports= {
    handleUserSignup,
    handleUserLogin,
}