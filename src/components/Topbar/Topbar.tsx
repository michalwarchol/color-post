import React, { useEffect, useState } from "react"

const Topbar = () => {

	const [username, setUsername] = useState<string | null>(null);

	useEffect(() => {
		fetch("/user/findById", {
			method: "get",
			headers: { 'Content-Type': 'application/json' },
		}).then(response => response.json())
			.then(res => {
				if(res.user)
					setUsername(res.user.name);
				if(res.error)
					setUsername(null);
			})
			.catch(err => console.log(err))
	}, [])

	const logout = () => {
		localStorage.clear();
		location.assign("/logout");
	}

	return (
		<div className="topbar">
			<div className="upperTopbar container d-flex flex-column flex-sm-row">
				<div className="logo col-12 col-sm-6 d-flex align-items-center justify-content-center  justify-content-sm-start">
					<a href="/">Color Post</a>
				</div>
				<div className="buttons col-12 col-sm-6 d-flex flex-row justify-content-center justify-content-sm-end d-flex align-items-center">
					{
						username ?
							<>
								<div className="welcomeBox">Welcome {username}!</div>
							</>
							: <>
								<a href="/login" className="loginButton">Login</a>
								<a href="/signup" className="signupButton">Sign up</a>
							</>
					}

				</div>
			</div>
			{
				username &&
				<div className="lowerTopbar">
					<div className="container d-flex flex-row justify-content-end">
						<a href="/">Home</a>
						<a href="/profile">Profile</a>
						<a href="/explore">Explore</a>
						<a onClick={logout}>Logout</a>
					</div>
				</div>
			}
		</div>
	)
}

export default Topbar;