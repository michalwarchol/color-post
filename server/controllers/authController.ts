import "dotenv-safe/config";
import {Request, Response} from "express";
import {User} from '../models/user';
import {sign, verify} from "jsonwebtoken";

interface IPossibleErrors {
    name?: string,
    password?: string,
    password_c?: string
}

//handle errors
const handleSignUpErrors = (err: Error) => {
    let errors: IPossibleErrors= {};
    //validation errors
    console.log(err)
    if(err.message.includes("User already exists")){
        errors.name=err.message;
    }

    if(err.message.includes("Please enter your first name")){
        errors.name="Please enter your name";
    }

    if(err.message.includes("Please enter your first name")){
        errors.name="User name is too short";
    }

    if(err.message.includes("Please enter a password")){
        errors.password="Please enter a password";
    }

    if(err.message.includes("Password is too short")){
        errors.password="Password is too short";
    }

    if(err.message.includes("Password confirmation doesn't match")){
        errors.password_c=err.message;
    }

    if(err.message.includes("Failed to create new user")){
        errors.name=err.message;
    }
    return errors;
}

const handleLogInErrors = (err: Error) => {
    let errors: IPossibleErrors = {}
    if(err.message.includes("User doesn't exist")){
        errors.name = err.message;
    }
    if(err.message.includes("Incorrect password")){
        errors.password = err.message;
    }
     return errors;
}

const handlePasswordResetErrors = (err: Error) => {
    let errors: IPossibleErrors = {}

    if(err.message.includes("JWT token not verified")){
        errors.password_c = err.message;
    }

    if(err.message.includes("JWT token expired")){
        errors.password_c = err.message;
    }

    if(err.message.includes("Failed to update document!")){
        errors.password_c = err.message;
    }

    if(err.message.includes("Failed to find user")){
        errors.name = err.message;
    }

    if(err.message.includes("Incorrect password")){
        errors.password = err.message;
    }

    return errors;
}


//creates json web token
const maxAge = 60*20;

const createToken = (id: string) => {
    return sign({id}, process.env.JWT_SECRET as string, {
        expiresIn: maxAge,
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
        const errors = handleSignUpErrors(err);
        res.status(400).json({errors});
    }
}

export const login_post = async (req: Request, res: Response) => {
    const {name, password} = req.body;

    try{
        const user = await User.login(name, password);
        if(!user){
            throw new Error("User doesn't exist");
        }
        const token = createToken(user._id.toString());
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge*1000})
        res.status(200).json({user:{
            _id: user._id,
            name: user.name,
            likedPalettes: user.likedPalettes
        }});
    }catch(err){
        const errors = handleLogInErrors(err);
        res.status(400).json({errors});
    }
    
}

export const reset_password = async (req: Request, res: Response) => {
    const token = req.cookies.jwt;
    try{
        if(token){
            const decodedToken: any = verify(token, process.env.JWT_SECRET as string);
            if(decodedToken){
                await User.resetPassword(decodedToken.id, 
                req.body.oldPassword as string,
                req.body.newPassword as string,
                ()=>{
                    res.status(200).json({message: "success"});
                });
            }
        }else throw new Error("JWT token expired");
    }catch(err){
        const errors = handlePasswordResetErrors(err);
        res.status(400).json({errors})
    }
}

export const logout_get = (_: Request, res: Response) => {
    res.cookie('jwt', "", {maxAge: 1});
    res.redirect("/");
}