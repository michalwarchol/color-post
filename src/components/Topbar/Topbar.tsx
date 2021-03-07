import React, { useEffect, useState } from "react"

const Topbar = () => {

	const [username, setUsername] = useState<string | null>(null);

	useEffect(() => {
		fetch("/user/findById", {
			method: "get",
			headers: { 'Content-Type': 'application/json' },
		}).then(response => response.json())
			.then(res => setUsername(res.user.name))
			.catch(err => console.log(err))
	}, [])

	return (
		<div className="topbar">
			<div className="upperTopbar container d-flex flex-row">
				<div className="logo col-6 d-flex align-items-center">
					Color Post
					</div>
				<div className="buttons col-6 d-flex flex-row justify-content-end d-flex align-items-center">
					{
						username ?
							<>
								<div className="welcomeBox">Welcome {username}!</div>
								<div className="loginButton"><a href="/logout">Logout</a></div>
							</>
							: <>
								<div className="loginButton"><a href="/login">Login</a></div>
								<div className="signupButton"><a href="/signup">Sign up</a></div>
							</>
					}

				</div>
			</div>
			{
				username &&
				<div className="lowerTopbar">
					<div className="container d-flex flex-row justify-content-end">
						<div className="myPatterns"><a href="/my-patterns">My patterns</a></div>
						<div className="likedPatterns"><a href="/liked-patterns">Liked patterns</a></div>
					</div>
				</div>
			}
		</div>
	)
}

export default Topbar;