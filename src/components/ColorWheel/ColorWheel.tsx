import React, { useCallback, useEffect, useRef, useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { AnyAction, Dispatch } from 'redux';
import {ThunkDispatch} from 'redux-thunk';
import {StateType} from '../../reducers/types';
import Pointer from '../Pointer/Pointer';
import { movePointInCircle, 
  radius, 
  getPointerColor,
  updatePointerPosition,
  generateColorWheel,
  setPointerColor,
  Coordinates} from "./ColorWheelController";

  interface Props {
    mainColor: string,
    setMainColor: (color: string) => void,
    mainPointerX: number,
    mainPointerY: number,
    colors: number[]
}


const ColorWheel:React.FC<Props> = ({mainColor, setMainColor, mainPointerX, mainPointerY, colors}) => {

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mainPointerRef = useRef<HTMLDivElement>(null);
  const [pointerTaken, setPointerTaken] = useState<boolean>(false)

  const dispatch: Dispatch<any> = useDispatch();

  useEffect(() => {
    const canvas = canvasRef.current as any;
    const context = canvas.getContext("2d");
    generateColorWheel(context);

    let pointer = mainPointerRef.current as any;
    pointer.style.left = radius-10+"px";
    pointer.style.top = radius-10+"px";
  }, [])

  useEffect(()=>{
    let mainPointer = mainPointerRef.current as any;
    let canvas = canvasRef.current as any;
    let context = canvas.getContext("2d");
    movePointInCircle(mainPointer);
    let newPointerColor = getPointerColor(context);
    if(newPointerColor!=null){
      setMainPointerColor(newPointerColor);
    }
  }, [mainPointerX, mainPointerY])

  const takePointer = () => {
    setPointerTaken(true);
    document.addEventListener('mouseup', ()=>{
      setPointerTaken(false);
    }, {once: true})
  }

  const dropPointer = () => {
    setPointerTaken(false)
  }

  const canvasMove = (e: React.MouseEvent) => {
    if (pointerTaken) {
      let canvas = canvasRef.current as any;
      updatePointerPosition(e, canvas);
    }
  }

  const setMinorPointerColor = (x: number, y: number, id: number) => {
    let canvas = canvasRef.current as any;
    let context = canvas.getContext("2d");
    setPointerColor(context, id, x, y);
  }

  const setMainPointerColor = useCallback(
    (color: string)=> dispatch(setMainColor(color)),
    [dispatch, setMainColor]
  )

  return (
    <div className="canvas_container">
      <canvas 
        ref={canvasRef} 
        width="512px" 
        height="512px" 
        onMouseDown={takePointer} 
        onMouseUp={dropPointer} 
        onMouseMove={canvasMove}></canvas>
      <div className="pointer main_pointer" ref={mainPointerRef} style={{background: mainColor}}>
      </div>
      <Pointer id={1} key={1} setPointerColor={setMinorPointerColor}/>
      <Pointer id={2} key={2} setPointerColor={setMinorPointerColor}/>
      <Pointer id={3} key={3} setPointerColor={setMinorPointerColor}/>
      <Pointer id={4} key={4} setPointerColor={setMinorPointerColor}/>
    </div>
  )
}

const mapStateToProps = (state: StateType) => ({
    mainColor: state.mainColor,
    mainPointerX: state.x,
    mainPointerY: state.y,
    colors: state.colors
})

const mapDispatchToProps = (dispatch: Dispatch) =>({
    setMainColor: (payload: string) => dispatch({type: "CHANGE_MAIN_COLOR", color: payload}),
    setMainPointerPosition: (payload: Coordinates) => dispatch({type: "MOVE_MAIN_POINTER", x: payload.x, y: payload.y})
})

export default connect(mapStateToProps, mapDispatchToProps)(ColorWheel);