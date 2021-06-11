import React, { useState } from "react";
import Button from "../Button/Button";
import InputField from "../../components/InputField/InputField";

interface Props {
  cancel(): void;
  onSuccess(): void;
}

const PasswordReset: React.FC<Props> = ({ cancel, onSuccess }) => {
  const [oldPassword, setOldPassword] = useState<string>("");
  const [oldPasswordError, setOldPasswordError] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [newPasswordError, setNewPasswordError] = useState<string>("");
  const [repeatNewPassword, setRepeatNewPassword] = useState<string>("");
  const [repeatPasswordError, setRepeatPasswordError] = useState<string>("");


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== repeatNewPassword) {
      setOldPasswordError("");
      setNewPasswordError("");
      setRepeatPasswordError("Password confirmation doesn't match!");
      return;
    }
    if (newPassword.length < 8) {
      setOldPasswordError("");
      setNewPasswordError("New password is too short!");
      setRepeatPasswordError("");
      return;
    }
    fetch("/reset", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        oldPassword,
        newPassword,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        if(res?.errors){
          if(res.errors.name){
            setOldPasswordError("");
            setNewPasswordError("");
            setRepeatPasswordError(res.errors.name);
          }
          if(res.errors.password){
            setOldPasswordError(res.errors.password);
            setNewPasswordError("");
            setRepeatPasswordError("");
          }
          if(res.errors.password_c){
            setOldPasswordError("");
            setNewPasswordError("");
            setRepeatPasswordError(res.errors.password_c);
          }
        }
        else{
          onSuccess();
          cancel();
        }
      })
      .catch((err) => console.log(err));
  }

  const onOldPasswordChange = (e: React.FormEvent<HTMLInputElement>) => {
    setOldPassword(e.currentTarget.value);
  }

  const onNewPasswordChange = (e: React.FormEvent<HTMLInputElement>) => {
    setNewPassword(e.currentTarget.value);
  }

  const onRepeatPasswordChange = (e: React.FormEvent<HTMLInputElement>) => {
    setRepeatNewPassword(e.currentTarget.value);
  }

  return (
    <div className="passwordReset d-flex align-items-center justify-content-center">
      <div className="passwordResetInner">
        <a href="/">
          <h1>Color Post</h1>
        </a>
        <h2>Reseting your password</h2>
        <p>
          To reset your password, please enter your current password and a new
          password.
        </p>
        <form onSubmit={handleSubmit} className="d-flex align-items-center flex-column">
          <InputField 
            name="oldPassword" 
            label="password" 
            type="password" 
            error={oldPasswordError}
            value={oldPassword}
            onChange={onOldPasswordChange}
          />
          <InputField 
            name="newPassword" 
            label="new password" 
            type="password" 
            error={newPasswordError}
            value={newPassword}
            onChange={onNewPasswordChange}
          />
          <InputField
            name="repeatNewPassword"
            label="repeat new password"
            type="password"
            error={repeatPasswordError}
            value={repeatNewPassword}
            onChange={onRepeatPasswordChange}
          />
          <div className="d-flex flex-row">
            <Button
              text="Reset"
              type="submit"
              handleClick={() => {}}
            />
            <Button text="Cancel" type="button" handleClick={cancel} />
          </div>
        </form>
      </div>
    </div>
  );
};
export default PasswordReset;
