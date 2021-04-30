import React, { useEffect, useState } from 'react'
import {connect} from "react-redux"

import Topbar from "../../components/Topbar/Topbar";
import ColorWheel from "../../components/ColorWheel/ColorWheel";
import Square from '../../components/Square/Square';
import SelectModes from "../../components/SelectModes/SelectModes";
import SquareControls from "../../components/SquareControls/SquareControls";
import CustomPattern from "../../components/CustomPattern/CustomPattern";
import Pattern from "../../components/Pattern/Pattern";
import Button from "../../components/Button/Button";
import Footer from "../../components/Footer/Footer";

import { StateType, PatternType, ColorType } from "../../reducers/types";

interface Props {
	palette: ColorType[]
}

const Main: React.FC<Props> = ({palette}) => {

	const [mode, setMode] = useState<string>("primary");
	const [customVisible, setCustomVisible] = useState<boolean>(false);
	const [width, setWidth] = useState<number>(window.innerWidth);
	const [squareActive, setSquareActive] = useState<number | null>(window.innerWidth >= 768 ? null : 0);
	const [squareShades, setSquareShades] = useState<number[]>([100, 100, 100, 100, 100]);
	const [latestPatterns, setLatestPatterns] = useState<PatternType[]>([]);
	const [moreLatest, setMoreLatest] = useState<number>(0);
	const [popularPatterns, setPopularPatterns] = useState<PatternType[]>([]);
	const [morePopular, setMorePopular] = useState<number>(0);

	useEffect(() => {
		window.addEventListener("resize", () => setWidth(window.innerWidth))
	}, [])

	useEffect(() => {
		if (width >= 768)
			setSquareActive(null);
		else
			setSquareActive(0);
	}, [width])

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

	const handleSquareClick = (id: number) => {
		setSquareActive(id);
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

	const savePattern = () => {
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
		}).catch(err => {
			console.log(err)
		})
    }

	const saveCustom = (palette: ColorType[]) => {
		fetch("/api/v1/palette/create", {
			method: "post",
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				palette: palette
			})
		}).then(response => {
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
			<div className="canvasContainer container d-flex flex-column">
				<SelectModes handleModeChange={handleModeChange} />
				<ColorWheel mode={mode} />
				<div className="modes col-12 col-lg-9 d-flex flex-column flex-md-row justify-content-center" >
					<div className="d-flex flex-column flex-sm-row align-items-center justify-content-center">
						<Button text="save pattern" handleClick={savePattern} />
						<Button text="create custom" handleClick={createCustomPattern} />
					</div>
				</div>
				
			</div>
			<div className="container-fluid d-flex flex-row justify-content-center">
				<Square id={0} mode={mode} active={squareActive} setActive={handleSquareClick} shades={squareShades} setShade={setSquareShades} />
				<Square id={1} mode={mode} active={squareActive} setActive={handleSquareClick} shades={squareShades} setShade={setSquareShades} />
				<Square id={2} mode={mode} active={squareActive} setActive={handleSquareClick} shades={squareShades} setShade={setSquareShades} />
				<Square id={3} mode={mode} active={squareActive} setActive={handleSquareClick} shades={squareShades} setShade={setSquareShades} />
				<Square id={4} mode={mode} active={squareActive} setActive={handleSquareClick} shades={squareShades} setShade={setSquareShades} />
			</div>
			{window.innerWidth <= 768 && squareActive!==null &&
				<SquareControls id={squareActive} mode={mode} shades={squareShades} setShade={setSquareShades} />
			}
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

const mapStateToProps = (state: StateType) => ({
	palette: state.colors
})

export default connect(mapStateToProps)(Main);