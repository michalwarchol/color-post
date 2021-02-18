import React, { useEffect, useRef } from 'react'
import { connect, useDispatch } from 'react-redux'
import { AnyAction, Dispatch } from 'redux';
import {degreesToRadians, radius} from '../ColorWheel/ColorWheelController'
import {StateType} from '../../reducers/types';

interface Props {
    id: number,
    angle: number
}


const Pointer:React.FC<Props> = ({id}) => {

    const pointerRef = useRef<HTMLDivElement>(null);

    const moveByVector = () => {
        
    }

    useEffect(()=>{
        moveByVector()
    })

    return (
        <div className="pointer" ref={pointerRef}>
        </div>
    )
}

const mapStateToProps = (state: StateType) => {
    return {
      mainPointerX: state.x,
      mainPointerY: state.y
    }
  }

export default connect(mapStateToProps)(Pointer);