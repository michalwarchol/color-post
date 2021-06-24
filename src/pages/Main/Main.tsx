import React, { useEffect, useState } from "react";

import Topbar from "../../components/Topbar/Topbar";
import ColorWheel from "../../components/ColorWheel/ColorWheel";
import Square from "../../components/Square/Square";
import SelectModes from "../../components/SelectModes/SelectModes";
import SquareControls from "../../components/SquareControls/SquareControls";
import Pattern from "../../components/Pattern/Pattern";
import Footer from "../../components/Footer/Footer";
import Modes from "../../components/modes";
import ColorWheelButtons from "../../components/ColorWheelButtons/ColorWheelButtons";
import { PatternType } from "../../reducers/types";

const Main: React.FC = () => {
  const [mode, setMode] = useState<Modes>(Modes.PRIMARY);
  const [width, setWidth] = useState<number>(window.innerWidth);
  const [squareActive, setSquareActive] = useState<number | null>(
    window.innerWidth >= 768 ? null : 0
  );
  const [squareShades, setSquareShades] = useState<number[]>([
    100,
    100,
    100,
    100,
    100,
  ]);
  const [latestPatterns, setLatestPatterns] = useState<PatternType[]>([]);
  const [moreLatest, setMoreLatest] = useState<number>(0);
  const [popularPatterns, setPopularPatterns] = useState<PatternType[]>([]);
  const [morePopular, setMorePopular] = useState<number>(0);
  const [focuedPattern, setFocusedPattern] = useState<string>("");

  useEffect(() => {
    window.addEventListener("resize", () => setWidth(window.innerWidth));
  }, []);

  useEffect(() => {
    if (width >= 768) setSquareActive(null);
    else setSquareActive(0);
  }, [width]);

  useEffect(() => {
    findLatest();
  }, [moreLatest]);

  useEffect(() => {
    findPopular();
  }, [morePopular]);

  const findLatest = () => {
    fetch("/api/v1/palette/findLatest?more=" + moreLatest, {
      method: "get",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.resource) setLatestPatterns(res.resource);
      })
      .catch((err) => console.log(err));
  };

  const findPopular = () => {
    fetch("/api/v1/palette/findPopular?more=" + morePopular, {
      method: "get",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.resource) setPopularPatterns(res.resource);
      })
      .catch((err) => console.log(err));
  };

  type Option = { value: Modes; label: string };
  const handleModeChange = (e: Option) => {
    setMode(e.value);
  };

  const handleSquareClick = (id: number) => {
    setSquareActive(id);
  };

  const showMoreLatest = () => {
    setMoreLatest(moreLatest + 8);
  };

  const showMorePopular = () => {
    setMorePopular(morePopular + 8);
  };

  const focusPattern = (id: string) => {
    setFocusedPattern(id);
  }

  return (
    <div className="main">
      <Topbar />
      <div className="canvasContainer container d-flex flex-column">
        <SelectModes handleModeChange={handleModeChange} />
        <ColorWheel mode={mode} />
        <div className="modes col-12 col-lg-9 d-flex flex-column flex-md-row justify-content-center">
          <ColorWheelButtons />
        </div>
      </div>
      <div className="container-fluid d-flex flex-row justify-content-center">
        <Square
          id={0}
          mode={mode}
          active={squareActive}
          setActive={handleSquareClick}
          shades={squareShades}
          setShade={setSquareShades}
        />
        <Square
          id={1}
          mode={mode}
          active={squareActive}
          setActive={handleSquareClick}
          shades={squareShades}
          setShade={setSquareShades}
        />
        <Square
          id={2}
          mode={mode}
          active={squareActive}
          setActive={handleSquareClick}
          shades={squareShades}
          setShade={setSquareShades}
        />
        <Square
          id={3}
          mode={mode}
          active={squareActive}
          setActive={handleSquareClick}
          shades={squareShades}
          setShade={setSquareShades}
        />
        <Square
          id={4}
          mode={mode}
          active={squareActive}
          setActive={handleSquareClick}
          shades={squareShades}
          setShade={setSquareShades}
        />
      </div>
      {window.innerWidth <= 768 && squareActive !== null && (
        <SquareControls
          id={squareActive}
          mode={mode}
          shades={squareShades}
          setShade={setSquareShades}
        />
      )}
      <div className="container d-flex flex-column">
        <h2>Popular patterns</h2>
        <div className="shownPatterns d-flex flex-row justify-content-start flex-wrap">
          {popularPatterns.map((elem, i) => (
            <Pattern
              key={i}
              id={elem._id}
              user={elem.user}
              likes={elem.likes}
              palette={elem.palette}
              focusedPattern={focuedPattern}
              focus={focusPattern}
            />
          ))}
        </div>
        <div className="showMore">
          <span onClick={showMorePopular}>show more</span>
        </div>
        <h2>Latest patterns</h2>
        <div className="shownPatterns d-flex flex-row justify-content-start flex-wrap">
          {latestPatterns.map((elem, i) => (
            <Pattern
              key={i}
              id={elem._id}
              user={elem.user}
              likes={elem.likes}
              palette={elem.palette}
              focusedPattern={focuedPattern}
              focus={focusPattern}
            />
          ))}
        </div>
        <div className="showMore">
          <span onClick={showMoreLatest}>show more</span>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Main;
