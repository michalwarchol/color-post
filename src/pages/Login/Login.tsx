import React, { useState } from 'react'


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
                setNameError(res.errors.name);
                setPasswordError(res.errors.password);
            }else{
                console.log(res);
                localStorage.setItem("user", JSON.stringify(res.user))
                location.assign("/");
            }
        })
        .catch(err=>{
            console.log("sdsadsa")
            console.log(err);
        })
    }

    return (
        <div className="login_page d-flex">
            <div className="form_login d-flex col-12 col-sm-6 col-md-3 align-items-center justify-content-center flex-column">
                <h2>Welcome back</h2>
                <h3>Log in</h3>
                <form className="d-flex flex-column" action="/login" onSubmit={loginSubmit}>

                    <label>Name</label>
                    <input type="text" name="name" onChange={e=>setName(e.target.value)}/>
                    <span>{nameError}</span>

                    <label>Password</label>
                    <input type="password" name="password" onChange={e=>setPassword(e.target.value)}/>
                    <span>{passwordError}</span>

                    <div className="submit_button d-flex justify-content-around">
                        <button type="submit">Login</button>
                        <span className="d-flex align-self-center">Don't have an account?&nbsp;<a href="/signup">Sign Up</a></span>
                    </div>
                </form>
            </div>
            <div className="slider">

            </div>
        </div>
    )
}

export default Login;