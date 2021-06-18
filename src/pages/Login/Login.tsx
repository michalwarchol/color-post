import React, { useState } from 'react'
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";
import Image from "../../img/background1920x1080.jpg";

const Login = () => {

    const [name, setName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [nameError, setNameError] = useState<string>("")
    const [passwordError, setPasswordError] = useState<string>("")

    const loginSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        fetch("/login",{
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name, password})
        })
        .then(response=>response.json())
        .then(res=>{
            if(res.errors){
                if(res.errors.name)
                    setNameError(res.errors.name);
                if(res.errors.password)
                    setPasswordError(res.errors.password);
            }else{
                localStorage.setItem("user", JSON.stringify(res.user))
                location.assign("/");
            }
        })
        .catch(err=>{
            console.log(err);
        })
    }

    return (
        <div className="login_page d-flex">
            <img src={Image} alt="not found" />
            <div className="form d-flex col-12 col-md-6 col-xl-4 align-items-center justify-content-center flex-column">
                <h1 className="mt-auto">Color Post</h1>
                <h2>Welcome back</h2>
                <form className="d-flex flex-column" action="/login" onSubmit={loginSubmit}>
                    <InputField name="name" label="Name" type="text" error={nameError} value={name} onChange={e=>setName(e.currentTarget.value)}/>
                    <InputField name="password" label="Password" type="password" error={passwordError} value={password} onChange={e=>setPassword(e.currentTarget.value)}/>
                    <div className="submit_button d-flex justify-content-around flex-column align-items-center">
                        <Button type="submit" text="Login" handleClick={()=>{}}/>
                        <span className="d-flex align-self-center">Don't have an account?&nbsp;<a href="/signup">Sign Up</a></span>
                    </div>
                </form>
                <div className="info d-flex mt-auto justify-content-center">
                    <div className="">
                        <p>You can find code of this project at <a href="https://github.com/michalwarchol/color-post">Github</a></p>
                        <p>Copyright &copy; {new Date().getFullYear()} Michał Warchoł. All rights reserved</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;