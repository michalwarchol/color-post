import React, { useState } from "react";
import Button from "../Button/Button";

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

  const passwordReset = () => {
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
      body: JSON.stringify({ oldPassword, newPassword }),
    })
      .then((response) => response.json())
      .then((res) => {
        if(res.responseObject.passwordError!==""){
          setOldPasswordError(res.responseObject.passwordError);
          setNewPasswordError("");
          setRepeatPasswordError("");
        }else{
          onSuccess();
          cancel();
        }
      })
      .catch((err) => console.log(err));
  };

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
        <form
          className="d-flex align-items-center flex-column"
          onSubmit={passwordReset}
        >
          <div className="inputField d-flex flex-column">
            <label>Current password</label>
            <input
              type="password"
              name="name"
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <span>{oldPasswordError}</span>
          </div>
          <div className="inputField d-flex flex-column">
            <label>New password</label>
            <input
              type="password"
              name="name"
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <span>{newPasswordError}</span>
          </div>
          <div className="inputField d-flex flex-column">
            <label>Repeat new password</label>
            <input
              type="password"
              name="name"
              onChange={(e) => setRepeatNewPassword(e.target.value)}
            />
            <span>{repeatPasswordError}</span>
          </div>
          <div className="d-flex flex-row">
            <Button text="Reset" handleClick={passwordReset} />
            <Button text="Cancel" handleClick={cancel} />
          </div>
        </form>
      </div>
    </div>
  );
};
export default PasswordReset;