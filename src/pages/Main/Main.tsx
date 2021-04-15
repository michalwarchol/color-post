import React, { useEffect, useState } from 'react'

import Topbar from "../../components/Topbar/Topbar";
import ColorWheel from "../../components/ColorWheel/ColorWheel";
import Square from '../../components/Square/Square';
import RadioButtonModes from "../../components/RadioButtonModes/RadioButtonModes";
import SelectModes from "../../components/SelectModes/SelectModes";
import CustomPattern from "../../components/CustomPattern/CustomPattern";
import Pattern from "../../components/Pattern/Pattern";
import Footer from "../../components/Footer/Footer";

import { PatternType, ColorType } from "../../reducers/types";

const Main: React.FC = () => {

	const [mode, setMode] = useState<string>("primary");
	const [customVisible, setCustomVisible] = useState<boolean>(false);
	const [width, setWidth] = useState<number>(window.innerWidth);
	const [latestPatterns, setLatestPatterns] = useState<PatternType[]>([]);
	const [moreLatest, setMoreLatest] = useState<number>(0);
	const [popularPatterns, setPopularPatterns] = useState<PatternType[]>([]);
	const [morePopular, setMorePopular] = useState<number>(0);

	useEffect(() => {
		window.addEventListener("resize", () => setWidth(window.innerWidth))
	})
	useEffect(() => {
		findLatest();
	}, [moreLatest])

	useEffect(() => {
		findPopular();
	}, [morePopular])

	const findLatest = () => {
		fetch("/api/v1/palette/findLatest?more=" + moreLatest, {
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
		fetch("/api/v1/palette/findPopular?more=" + morePopular, {
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

	const showMoreLatest = () => {
		setMoreLatest(moreLatest + 8);
	}

	const showMorePopular = () => {
		setMorePopular(morePopular + 8);
	}

	const createCustomPattern = () => {
		setCustomVisible(!customVisible);
	}

	const cancelCustomPattern = () => {
		setCustomVisible(false);
	}

	const saveCustom = (palette: ColorType[]) => {
		fetch("/api/v1/palette/create", {
			method: "post",
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				palette: palette
			})
		}).then(response => {
			console.log(response)
			if (response.redirected == true) {
				location.assign(response.url)
			}
			setCustomVisible(false);
		}).catch(err => {
			console.log(err)
		})
	}

	return (
		<div className="main">
			<Topbar />
			<div className="canvasContainer container d-flex flex-column flex-lg-row">
				{width >= 992
					? <RadioButtonModes handleModeChange={handleModeChange} createCustomPattern={createCustomPattern} />
					: <SelectModes handleModeChange={handleModeChange} createCustomPattern={createCustomPattern} />}

				<ColorWheel mode={mode} />
			</div>
			<div className="container-fluid d-flex flex-row justify-content-center">
				<Square id={0} mode={mode} />
				<Square id={1} mode={mode} />
				<Square id={2} mode={mode} />
				<Square id={3} mode={mode} />
				<Square id={4} mode={mode} />
			</div>
			<div className="container d-flex flex-column">
				<h2>Popular patterns</h2>
				<div className="popularPatterns d-flex flex-row justify-content-start flex-wrap">
					{popularPatterns.map((elem, i) =>
						<Pattern key={i}
							id={elem._id}
							user={elem.user}
							likes={elem.likes}
							palette={elem.palette} />
					)}
				</div>
				<div className="showMore">
					<span onClick={showMorePopular}>show more</span>
				</div>
				<h2>Latest patterns</h2>
				<div className="latestPatterns d-flex flex-row justify-content-start flex-wrap">
					{latestPatterns.map((elem, i) =>
						<Pattern key={i} id={elem._id}
							user={elem.user}
							likes={elem.likes}
							palette={elem.palette} />
					)}
				</div>
				<div className="showMore">
					<span onClick={showMoreLatest}>show more</span>
				</div>
			</div>
			<Footer />
			{customVisible && <CustomPattern cancel={cancelCustomPattern} saveCustom={saveCustom} />}
		</div>
	)
}

export default Main;