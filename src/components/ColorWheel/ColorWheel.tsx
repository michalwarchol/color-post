import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import { ColorType, StateType } from '../../reducers/types';
import Pointer from '../Pointer/Pointer';
import {
  movePointInCircle,
  radius,
  updateMousePosition,
  generateColorWheel,
  setPointerColor
} from "./ColorWheelController";

interface Props {
  mode: string,
  mainPointerX: number,
  mainPointerY: number,
  mouseX: number,
  mouseY: number,
  colors: ColorType[]
}


const ColorWheel: React.FC<Props> = ({ mode, mainPointerX, mainPointerY, mouseX, mouseY, colors }) => {

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mainPointerRef = useRef<HTMLDivElement>(null);
  const [pointerTaken, setPointerTaken] = useState<boolean>(false);
  const [width, setWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    const canvas = canvasRef.current as any;
    const context = canvas.getContext("2d");
    generateColorWheel(context);

    let pointer = mainPointerRef.current as any;
    pointer.style.left = radius - 10 + "px";
    pointer.style.top = radius - 10 + "px";

    window.addEventListener("resize", () => setWidth(window.innerWidth))
  }, [])

  useEffect(() => {
    let mainPointer = mainPointerRef.current as any;
    movePointInCircle(mainPointer);
  }, [mouseX, mouseY])

  useEffect(() => {
    let canvas = canvasRef.current as any;
    let context = canvas.getContext("2d");
    setPointerColor(context, 0, mainPointerX, mainPointerY, mode);
  }, [mainPointerX, mainPointerY])

  const takePointer = (e: React.MouseEvent | React.PointerEvent) => {
    setPointerTaken(true);
    canvasMove(e);
    document.addEventListener('mouseup', () => {
      setPointerTaken(false);
    }, { once: true })
  }


  const dropPointer = () => {
    setPointerTaken(false)
  }

  const canvasMove = (e: React.MouseEvent | React.PointerEvent) => {
    console.log(e)
    let canvas = canvasRef.current as any;
    updateMousePosition(e, canvas, width);
  }

  const setMinorPointerColor = (x: number, y: number, id: number) => {
    let canvas = canvasRef.current as any;
    let context = canvas.getContext("2d");
    setPointerColor(context, id, x, y, mode);
  }

  return (
    <div className="colorWheel_container col-12 col-lg-9 d-flex justify-content-center align-items-center"
      onMouseUp={dropPointer}
      onPointerUp={dropPointer}
      onMouseMove={pointerTaken ? canvasMove : undefined}
      onPointerMove={pointerTaken?canvasMove: undefined}
      style={width<=768?{transform: "scale(0.5)"}:undefined}>
      <div className="colorWheel_inner_container">
        <canvas
          onMouseDown={takePointer}
          onPointerDown={takePointer}
          ref={canvasRef}
          width="512px"
          height="512px"
        ></canvas>
        <div className="pointer main_pointer"
          onMouseDown={takePointer}
          ref={mainPointerRef}
          style={{ background: "rgb("+colors[0].r+","+colors[0].g+","+colors[0].b+")" }}>
        </div>
        <Pointer id={1} key={1} setPointerColor={setMinorPointerColor} mode={mode} />
        <Pointer id={2} key={2} setPointerColor={setMinorPointerColor} mode={mode} />
        <Pointer id={3} key={3} setPointerColor={setMinorPointerColor} mode={mode} />
        <Pointer id={4} key={4} setPointerColor={setMinorPointerColor} mode={mode} />
      </div>
    </div>
  )
}

const mapStateToProps = (state: StateType) => ({
  mainPointerX: state.x,
  mainPointerY: state.y,
  mouseX: state.mouseX,
  mouseY: state.mouseY,
  colors: state.colors
})

export default connect(mapStateToProps)(ColorWheel);