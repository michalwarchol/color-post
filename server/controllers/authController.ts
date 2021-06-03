import "dotenv-safe/config";
import {Request, Response} from "express";
import {User} from '../models/user';
import {sign, verify} from "jsonwebtoken";

interface IPossibleErrors {
    name: string,
    password: string,
    password_c?: string
}

//handle errors
const handleSignUpErrors = () => {
    let errors: IPossibleErrors = {
        name: "", 
        password: "",
        password_c: ""
    }

    // //validation errors
    // if (err.message.includes('User validation failed')) {
    //     Object.values(err.errors).forEach(({ properties }) => {
    //       errors[properties.path] = properties.message;
    //     })
    // }

    // if(err.message.includes("User already exists")){
    //     errors.name=err.message;
    // }

    // if(err.message.includes("Password confirmation doesn't match")){
    //     errors.password_c="Password confirmation doesn't match";
    // }
    return errors;
}

const handleLogInErrors = () => {
    let errors: IPossibleErrors = {
        name: "",
        password: ""
    }
    // if(err.message.includes("incorrect name")){
    //     errors.name = err.message;
    // }
    // if(err.message.includes("incorrect password")){
    //     errors.password = err.message;
    // }
     return errors;
}


//creates json web token
const maxAge = 60*20;

const createToken = (id: string) => {
    return sign({id}, process.env.JWT_SECRET as string, {
        expiresIn: maxAge
    })
}


//controller actions
export const signup_post = async (req: Request, res: Response) => {
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
        const token = createToken(user._id.toString());
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge*1000})
        res.status(300).json("Signed up!");
    }
    catch(err){
        const errors = handleSignUpErrors();
        res.status(400).json({errors});
    }
}

export const login_post = async (req: Request, res: Response) => {
    const {name, password} = req.body;

    try{
        const user = await User.login(name, password);
        const token = createToken(user._id.toString());
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge*1000})
        res.status(200).json({user:{
            _id: user._id,
            name: user.name,
            likedPalettes: user.likedPalettes
        }});
    }catch(err){
        console.log(err)
        const errors = handleLogInErrors()
        res.status(400).json({errors})
    }
    
}

export const reset_password = async (req: Request, res: Response) => {
    const token = req.cookies.jwt;
    const decodedToken: any = verify(token, process.env.JWT_SECRET as string);

    let responseObject = {message: "", error: "", passwordError: ""}

    if(decodedToken){
        const result = await User.resetPassword(decodedToken.id, 
        req.body.oldPassword as string,
        req.body.newPassword as string,
        responseObject);

        if(result){
            responseObject.message="success!";
            res.status(200).json({responseObject})
        }else{
            responseObject.message="Failed to update document!";
            res.status(400).json({responseObject});
        }
    }else{
        responseObject.message="No user!";
        res.status(400).json({...responseObject});
    }
}

export const logout_get = (_: Request, res: Response) => {
    res.cookie('jwt', "", {maxAge: 1});
    res.redirect("/");
}