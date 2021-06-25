import React, { useState } from "react";
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";
import Image from "../../img/background1920x1080.jpg";

const SignUp = () => {
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [password_c, setPassword_c] = useState<string>("");

  const [nameError, setNameError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [password_cError, setPassword_cError] = useState<string>("");

  const signupSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    fetch("/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, password, password_c }),
    })
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        if (res.errors) {
          setNameError(res.errors.name);
          setPasswordError(res.errors.password);
          setPassword_cError(res.errors.password_c);
        } else {
          location.assign("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="login_page d-flex">
      <img src={Image} alt="not found" />
      <div className="form d-flex col-12 col-md-6 col-xl-4 align-items-center justify-content-center flex-column">
        <h1 className="mt-auto">
          <a href="/">Color Post</a>
        </h1>
        <h2>Sign up</h2>
        <form
          className="d-flex flex-column"
          action="/login"
          onSubmit={signupSubmit}
        >
          <InputField
            name="Name"
            label="Name"
            type="text"
            error={nameError}
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
          />
          <InputField
            name="Password"
            label="Password"
            type="password"
            error={passwordError}
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
          <InputField
            name="password_c"
            label="Repeat Password"
            type="password"
            error={password_cError}
            value={password_c}
            onChange={(e) => setPassword_c(e.currentTarget.value)}
          />
          <div className="submit_button d-flex justify-content-around flex-column align-items-center">
            <Button type="submit" text="Sign up" handleClick={() => {}} />
            <span className="d-flex align-self-center">
              Don't have an account?&nbsp;<a href="/login">Log in</a>
            </span>
          </div>
        </form>
        <div className="info d-flex mt-auto justify-content-center">
          <div className="">
            <p>
              You can find code of this project at{" "}
              <a href="https://github.com/michalwarchol/color-post">Github</a>
            </p>
            <p>
              Copyright &copy; {new Date().getFullYear()} Michał Warchoł. All
              rights reserved
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
