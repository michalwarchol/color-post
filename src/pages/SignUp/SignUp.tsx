import React, { useState } from 'react'

const SignUp = () => {

    const [name, setName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [password_c, setPassword_c] = useState<string>("");

    const [nameError, setNameError] = useState<string>("");
    const [passwordError, setPasswordError] = useState<string>("");
    const [password_cError, setPassword_cError] = useState<string>("");


    const signupSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        fetch("/signup",{
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name, password, password_c})
        })
        .then(response=>response.json())
        .then(res=>{
            console.log(res)
            if(res.errors){
                setNameError(res.errors.name);
                setPasswordError(res.errors.password);
                setPassword_cError(res.errors.password_c);
            }else{
                location.assign("/");
            }
        })
        .catch(err=>{
            console.log(err);
        })
    }

    return (
        <div className="signup_page d-flex">
            <div className="form_signup d-flex col-12 col-sm-6 col-md-3 align-items-center justify-content-center flex-column">
                <h2>Hello</h2>
                <h3>Sign up</h3>
                <form className="d-flex flex-column" action="/signup" onSubmit={signupSubmit}>
                    <label>Name</label>
                    <input type="text" name="name" onChange={e=>setName(e.target.value)}/>
                    <span>{nameError}</span>

                    <label>Password</label>
                    <input type="password" name="password" onChange={e=>setPassword(e.target.value)}/>
                    <span>{passwordError}</span>

                    <label>Confirm Password</label>
                    <input type="password" name="password_c" onChange={e=>setPassword_c(e.target.value)}/>
                    <span>{password_cError}</span>

                    <div className="submit_button d-flex justify-content-around">
                        <button type="submit">Login</button>
                        <span className="d-flex align-self-center">Already have an account?&nbsp;<a href="/login">Log in</a></span>
                    </div>
            </form>
            </div>
            
        </div>
    )
}

export default SignUp;