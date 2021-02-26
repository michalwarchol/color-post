import React, { useEffect, useState } from 'react'

import Topbar from "../../components/Topbar/Topbar";
import ColorWheel from "../../components/ColorWheel/ColorWheel";
import Square from '../../components/Square/Square';
import RadioButtonModes from "../../components/RadioButtonModes/RadioButtonModes";
import SelectModes from "../../components/SelectModes/SelectModes";

const Main = () => {

	const api_create = () => {
		fetch("/api/v1/palette/create", {
			method: "post",
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				user: "601318fb9dc5587d645a220f",
				palette: ["#123321", "#ABABAB"]
			})
		})
	}

	const api_findById = () => {
		fetch("/api/v1/palette/findById", {
			method: "post",
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				id: "60134419e04eca5c30051ae4"
			})
		})
			.then(response => response.json())
			.then(res => console.log(res))
			.catch(err => {
				console.log(err)
			})
	}

	const api_findAll = () => {
		fetch("/api/v1/palette/findAll", {
			method: "get",
			headers: { 'Content-Type': 'application/json' },
		})
			.then(response => response.json())
			.then(res => console.log(res));
	}

	const [mode, setMode] = useState<string>("primary");
	const [width, setWidth] = useState<number>(window.innerWidth);

	const handleModeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setMode(e.target.value);
	}
	useEffect(() => {
		window.addEventListener("resize", () => setWidth(window.innerWidth))
	})
	return (
		<div className="main">
			<Topbar />
			<div className="canvasContainer container d-flex flex-column flex-lg-row">
				{width >= 992
				? <RadioButtonModes handleModeChange={handleModeChange} /> 
				: <SelectModes handleModeChange={handleModeChange} />}

				<ColorWheel mode={mode} />
			</div>
			<div className="container-fluid d-flex flex-row justify-content-center">
				<Square id={0} mode={mode} />
				<Square id={1} mode={mode} />
				<Square id={2} mode={mode} />
				<Square id={3} mode={mode} />
				<Square id={4} mode={mode} />
			</div>

		</div>
	)
}

export default Main;