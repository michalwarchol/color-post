import React from "react"

const Topbar = () => {
    return (
        <div className="topbar">
				<div className="container d-flex flex-row">
					<div className="logo col-6 d-flex align-items-center">
						Color Post
					</div>
					<div className="buttons col-6 d-flex flex-row justify-content-end d-flex align-items-center">
						<div className="loginButton">Login</div>
                        <div className="signupButton">Sign up</div>
					</div>
				</div>
			</div>
    )
}

export default Topbar;