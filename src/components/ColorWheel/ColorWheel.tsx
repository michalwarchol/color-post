import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux';
import { StateType } from '../../reducers/types';
import Pointer from '../Pointer/Pointer';
import {
  movePointInCircle,
  radius,
  updatePointerPosition,
  generateColorWheel,
  setPointerColor,
  Coordinates
} from "./ColorWheelController";

interface Props {
  mode: string,
  mainPointerX: number,
  mainPointerY: number,
  colors: string[]
}


const ColorWheel: React.FC<Props> = ({ mode, mainPointerX, mainPointerY, colors }) => {

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
    let canvas = canvasRef.current as any;
    let context = canvas.getContext("2d");
    movePointInCircle(mainPointer);
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
    updatePointerPosition(e, canvas);
  }

  const setMinorPointerColor = (x: number, y: number, id: number) => {
    let canvas = canvasRef.current as any;
    let context = canvas.getContext("2d");
    setPointerColor(context, id, x, y);
  }

  return (
    <div className="canvas_container">
      <canvas
        ref={canvasRef}
        width="512px"
        height="512px"
        onMouseDown={takePointer}
        onMouseUp={dropPointer}
        onMouseMove={pointerTaken ? canvasMove : undefined}></canvas>
      <div className="pointer main_pointer" ref={mainPointerRef} style={{ background: colors[0] }}>
      </div>
      <Pointer id={1} key={1} setPointerColor={setMinorPointerColor} mode={mode} />
      <Pointer id={2} key={2} setPointerColor={setMinorPointerColor} mode={mode} />
      <Pointer id={3} key={3} setPointerColor={setMinorPointerColor} mode={mode} />
      <Pointer id={4} key={4} setPointerColor={setMinorPointerColor} mode={mode} />
    </div>
  )
}

const mapStateToProps = (state: StateType) => ({
  mainPointerX: state.x,
  mainPointerY: state.y,
  colors: state.colors
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setMainPointerPosition: (payload: Coordinates) => dispatch({ type: "MOVE_MAIN_POINTER", x: payload.x, y: payload.y })
})

export default connect(mapStateToProps, mapDispatchToProps)(ColorWheel);