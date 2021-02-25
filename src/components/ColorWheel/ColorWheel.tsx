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
  const [pointerTaken, setPointerTaken] = useState<boolean>(false)

  useEffect(() => {
    const canvas = canvasRef.current as any;
    const context = canvas.getContext("2d");
    generateColorWheel(context);

    let pointer = mainPointerRef.current as any;
    pointer.style.left = radius - 10 + "px";
    pointer.style.top = radius - 10 + "px";
  }, [])

  useEffect(() => {
    let mainPointer = mainPointerRef.current as any;
    movePointInCircle(mainPointer);
  }, [mouseX, mouseY])

  useEffect(() => {
    let canvas = canvasRef.current as any;
    let context = canvas.getContext("2d");
    setPointerColor(context, 0, mainPointerX, mainPointerY);
  }, [mainPointerX, mainPointerY])

  const takePointer = (e: React.MouseEvent) => {
    setPointerTaken(true);
    canvasMove(e);
    document.addEventListener('mouseup', () => {
      setPointerTaken(false);
    }, { once: true })
  }

  const dropPointer = () => {
    setPointerTaken(false)
  }

  const canvasMove = (e: React.MouseEvent) => {
    let canvas = canvasRef.current as any;
    updateMousePosition(e, canvas);
  }

  const setMinorPointerColor = (x: number, y: number, id: number) => {
    let canvas = canvasRef.current as any;
    let context = canvas.getContext("2d");
    setPointerColor(context, id, x, y);
  }

  return (
    <div className="canvas_container d-flex justify-content-center align-items-center"
      onMouseUp={dropPointer}
      onMouseMove={pointerTaken ? canvasMove : undefined}>
      <div className="canvas_inner_container">
        <canvas
          onMouseDown={takePointer}
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