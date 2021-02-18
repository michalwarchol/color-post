const User = require('../models/user');
const jwt = require("jsonwebtoken");

//handle errors
const handleSignUpErrors = (err) => {
    let errors = {
        name: "", 
        password: "",
        password_c: ""
    }

    //validation errors
    if (err.message.includes('User validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
          errors[properties.path] = properties.message;
        })
    }

    if(err.message.includes("User already exists")){
        errors.name=err.message;
    }

    if(err.message.includes("Password confirmation doesn't match")){
        errors.password_c="Password confirmation doesn't match";
    }
    return errors;
}

const handleLogInErrors = (err) => {
    let errors = {
        name: "",
        password: ""
    }
    if(err.message.includes("incorrect name")){
        errors.name = err.message;
    }
    if(err.message.includes("incorrect password")){
        errors.password = err.message;
    }
    return errors;
}


//creates json web token
const secret = process.env.JWT_SECRET; //Not quite good to keep the secret this way. Better keep it in .env file. Install dotenv, create .env file and store it there
const maxAge = 60*20;
const createToken = (id) => {
    return jwt.sign({id}, secret, {
        expiresIn: maxAge
    })
}


//controller actions
module.exports.signup_post = async (req, res) => {
    const { name, password, password_c } = req.body;
    try{
        const existentUser = await User.findOne({name});
        if(existentUser){
            throw new Error("User already exists");
        }

        if(password!==password_c){
            throw new Error("Password confirmation doesn't match");
        }

        const user = await User.create({
            name: name,
            password: password,
        })
        const token = createToken(user._id);
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge*1000})
        res.status(300).json("Signed up!");
    }
    catch(err){
        const errors = handleSignUpErrors(err);
        res.status(400).json({errors});
    }
}

module.exports.login_post = async (req, res) => {
    const {name, password} = req.body;

    try{
        const user = await User.login(name, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge*1000})
        res.status(200).json("Logged in!");
    }catch(err){
        console.log(err)
        const errors = handleLogInErrors(err)
        res.status(400).json({errors})
    }
    
}

module.exports.logout_get = (req, res) => {
    res.cookie('jwt', "", {maxAge: 1});
    res.redirect("/");
}