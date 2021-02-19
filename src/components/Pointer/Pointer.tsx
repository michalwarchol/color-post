import React, { useEffect, useRef, useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { AnyAction, Dispatch } from 'redux';
import {degreesToRadians, radius} from '../ColorWheel/ColorWheelController'
import {StateType} from '../../reducers/types';

interface Props {
    id: number,
    mainPointerX: number,
    mainPointerY: number,
    colors: number[]
}


const Pointer:React.FC<Props> = ({id, mainPointerX, mainPointerY, colors}) => {

    const [positionX, setPositionX] = useState<number>(245);
    const [positionY, setPositionY] = useState<number>(245);
    const pointerRef = useRef<HTMLDivElement>(null);

    const moveByVector = () => {
        let mainX = mainPointerX-radius;
        let mainY = mainPointerY-radius;
        let degrees = id%2==0 ? -30*id/2 : 30*(id+1)/2;
        let x = mainX * Math.cos(degreesToRadians(degrees)) - mainY*Math.sin(degreesToRadians(degrees));
        let y = mainX * Math.sin(degreesToRadians(degrees)) + mainY*Math.cos(degreesToRadians(degrees));
        setPositionX(radius+x-10);
        setPositionY(radius+y-10);
        let pointer = pointerRef.current as any;
        pointer.style.left=radius+x-10 + "px";
        pointer.style.top=radius+y-10 + "px";
    }

    useEffect(()=> {
        let pointer = pointerRef.current as any;
        pointer.style.left=positionX + "px";
        pointer.style.top=positionY + "px";
    },[])

    useEffect(()=>{
        moveByVector()
    }, [mainPointerX, mainPointerY])

    return (
        <div className="pointer" ref={pointerRef} style={{background: colors[id]}}>
        </div>
    )
}

  const mapStateToProps = (state: StateType) => {
    return {
      mainPointerX: state.x,
      mainPointerY: state.y,
      colors: state.colors
    }
  }

export default connect(mapStateToProps)(Pointer);