import React, { useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { moveByVector } from "../ColorWheel/ColorWheelController"
import { StateType, ColorType } from '../../reducers/types';

interface Props {
  id: number,
  mode: string,
  mainPointerX: number,
  mainPointerY: number,
  colors: ColorType[],
  setPointerColor: (x: number, y: number, id: number) => void
}

const Pointer: React.FC<Props> = ({ id, mode, mainPointerX, mainPointerY, colors, setPointerColor }) => {

  const pointerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let pointer = pointerRef.current as any;
    moveByVector(mode, id, pointer, setPointerColor);
  }, [mainPointerX, mainPointerY, mode])

  return (
    <div className="pointer" ref={pointerRef} style={{ background: "rgb("+colors[id].r+","+colors[id].g+","+colors[id].b+")" }}>
      {id}
    </div>
  )
}

const mapStateToProps = (state: StateType) => ({
  mainPointerX: state.x,
  mainPointerY: state.y,
  colors: state.colors
})

export default connect(mapStateToProps)(Pointer);