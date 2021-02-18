import React, { useCallback, useEffect, useRef, useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { AnyAction, Dispatch } from 'redux';
import {ThunkDispatch} from 'redux-thunk';
import {StateType} from '../../reducers/types';
import Pointer from '../Pointer/Pointer';
import { movePointInCircle, 
  radius, 
  getPointerColor,
  generateColorWheel,
  Coordinates} from "./ColorWheelController";

interface Props {
    mainColor: string,
    setMainColor: (color: string) => void
}


const ColorWheel:React.FC<Props> = ({mainColor, setMainColor}) => {

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mainPointerRef = useRef<HTMLDivElement>(null);
  const [pointerTaken, setPointerTaken] = useState<boolean>(false)
  const [pointerColor, setPointerColor] = useState<string>(mainColor);

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
    let pointer = mainPointerRef.current as any;
    pointer.style.backgroundColor=pointerColor;
  }, [pointerColor, setPointerColor])

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
      let context = canvas.getContext("2d");
      let mainPointer = mainPointerRef.current as any;
      movePointInCircle(e, canvas, mainPointer);
      let newPointerColor = getPointerColor(e, canvas, context);
      if(newPointerColor!=undefined){
        setPointerColor(newPointerColor);
        setMainPointerColor(newPointerColor);
      }
    }
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
      <div className="pointer main_pointer" ref={mainPointerRef}>
      </div>
      <Pointer id={1} key={1} />
      <Pointer id={1} key={2} />
    </div>
  )
}

const mapStateToProps = (state: StateType) => {
  return {
    mainColor: state.mainColor,
    mainPointerX: state.x,
    mainPointerY: state.y
  }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) =>{
  return {
    setMainColor: (payload: string) => dispatch({type: "CHANGE_MAIN_COLOR", color: payload}),
    setMainPointerPosition: (payload: Coordinates) => dispatch({type: "MOVE_MAIN_POINTER", x: payload.x, y: payload.y})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ColorWheel);