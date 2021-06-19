import React, { useEffect, useState } from "react";
import Button from "../Button/Button";
import PasswordReset from "../PasswordReset/PasswordReset";
import NotificationBadge from "../NotificationBadge/NotificationBadge";
import { BsGear, BsGearFill } from "react-icons/bs";

const Topbar = () => {
  const [username, setUsername] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [passwordResetPanel, setPasswordResetPanel] = useState<boolean>(false);
  const [passwordChanged, setPasswordChanged] = useState<boolean|null>(null);

  useEffect(() => {
    fetch("/user/findById", {
      method: "get",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.user) setUsername(res.user.name);
        if (res.error) setUsername(null);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(()=>{
	if(typeof passwordChanged === "boolean"){
		setTimeout(()=>{
			setPasswordChanged(null);
		}, 3000)
	}
}, [passwordChanged])

  const handleSettings = () => {
    setShowSettings(!showSettings);
  };

  const passwordReset = () => {
	setPasswordResetPanel(true);
}
const passwordResetCancel = () => {
	setPasswordResetPanel(false);
}

const handlePasswordChanged = () => {
	setPasswordChanged(!passwordChanged);
}

  const logout = () => {
    localStorage.clear();
    location.assign("/logout");
  };

  return (
    <div className="topbar">
      <div className="upperTopbar container d-flex flex-column flex-sm-row">
        <div className="logo col-12 col-sm-6 d-flex align-items-center justify-content-center  justify-content-sm-start">
          <a href="/">Color Post</a>
        </div>
        <div className="buttons col-12 col-sm-6 d-flex flex-row justify-content-center justify-content-sm-end d-flex align-items-center">
          {username ? (
            <>
              <div className="welcomeBox">Welcome {username}!</div>
              <div onClick={handleSettings}>
                {showSettings ? <BsGearFill /> : <BsGear />}
              </div>
            </>
          ) : (
            <>
              <a href="/login" className="loginButton">
                Login
              </a>
              <a href="/signup" className="signupButton">
                Sign up
              </a>
            </>
          )}
        </div>
      </div>
      {username && (
        <>
          <div className="lowerTopbar">
            <div className="container d-flex flex-row justify-content-end">
              <a href="/">Home</a>
              <a href="/profile">Profile</a>
              <a href="/explore">Explore</a>
              <a onClick={logout}>Logout</a>
            </div>
          </div>
          {showSettings && (
            <div className="settings ">
              <div className="d-flex container flex-column justify-content-end">
                <span>Settings</span>
                <div className="buttons d-flex flex-row justify-content-end">
                  <Button
                    text="Reset password"
                    handleClick={passwordReset}
                    type="button"
                  />
                </div>
              </div>
            </div>
          )}
        </>
      )}
	  {passwordResetPanel && <PasswordReset onSuccess={handlePasswordChanged} cancel={passwordResetCancel} />}
	  {(passwordChanged || !passwordChanged) && typeof passwordChanged === "boolean" && (
                <NotificationBadge text="Password has been reset" />
    	)}
    </div>
  );
};

export default Topbar;
