import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import {degreesToRadians, radius} from '../ColorWheel/ColorWheelController'
import {StateType} from '../../reducers/types';

interface Props {
    id: number,
    mainPointerX: number,
    mainPointerY: number,
    colors: string[],
    setPointerColor: (x: number, y: number, id: number) => void
}


const Pointer:React.FC<Props> = ({id, mainPointerX, mainPointerY, colors, setPointerColor}) => {

    const [positionX, setPositionX] = useState<number>(245);
    const [positionY, setPositionY] = useState<number>(245);
    const pointerRef = useRef<HTMLDivElement>(null);

    const moveByVector = () => {
        let mainX = mainPointerX-radius;
        let mainY = mainPointerY-radius;
        let degrees = id%2==0 ? -30*id/2 : 30*(id+1)/2;
        let x = mainX * Math.cos(degreesToRadians(degrees)) - mainY*Math.sin(degreesToRadians(degrees));
        let y = mainX * Math.sin(degreesToRadians(degrees)) + mainY*Math.cos(degreesToRadians(degrees));
        setPositionX(radius+x);
        setPositionY(radius+y);
    }

    useEffect(()=> {
        let pointer = pointerRef.current as any;
        pointer.style.left=positionX-10 + "px";
        pointer.style.top=positionY-10 + "px";
    },[positionX, positionY])

    useEffect(()=>{
        moveByVector()
        setPointerColor(positionX, positionY, id)
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