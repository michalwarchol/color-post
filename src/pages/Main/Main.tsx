import React, { useEffect, useState } from 'react'

import Topbar from "../../components/Topbar/Topbar";
import ColorWheel from "../../components/ColorWheel/ColorWheel";
import Square from '../../components/Square/Square';
import RadioButtonModes from "../../components/RadioButtonModes/RadioButtonModes";
import SelectModes from "../../components/SelectModes/SelectModes";
import Pattern from "../../components/Pattern/Pattern";

import { PatternType } from "../../reducers/types";

const Main:React.FC = () => {

	const [mode, setMode] = useState<string>("primary");
	const [width, setWidth] = useState<number>(window.innerWidth);
	const [latestPatterns, setLatestPatterns] = useState<PatternType[]>([]);
	const [popularPatterns, setPopularPatterns] = useState<PatternType[]>([]);

	useEffect(() => {
		window.addEventListener("resize", () => setWidth(window.innerWidth))
	})
	useEffect(() => {
		findLatest();
		findPopular();
	}, [])

	const findLatest = () => {
		fetch("/api/v1/palette/findLatest", {
			method: "get",
			headers: { 'Content-Type': 'application/json' },
		})
			.then(response => response.json())
			.then(res => {
				if (res.resource)
					setLatestPatterns(res.resource);
			})
			.catch(err => console.log(err));
	}

	const findPopular = () => {
		fetch("/api/v1/palette/findPopular", {
			method: "get",
			headers: { 'Content-Type': 'application/json' },
		})
			.then(response => response.json())
			.then(res => {
				if (res.resource)
					setPopularPatterns(res.resource);
			})
			.catch(err => console.log(err));
	}

	const handleModeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setMode(e.target.value);
	}

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
			<h2>Colors</h2>
			<div className="container d-flex flex-column">
				<div className="popularPatterns d-flex flex-row justify-content-start flex-wrap">
					{popularPatterns.map((elem, i) =>
						<Pattern key={i}
							id={elem._id}
							user={elem.user}
							likes={elem.likes}
							palette={elem.palette} />
					)}
				</div>
				<div className="latestPatterns d-flex flex-row justify-content-start flex-wrap">
					{latestPatterns.map((elem, i) =>
						<Pattern key={i} id={elem._id}
							user={elem.user}
							likes={elem.likes}
							palette={elem.palette} />
					)}
				</div>
			</div>
		</div>
	)
}

export default Main;