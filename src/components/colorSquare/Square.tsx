import React from 'react'
import {connect} from 'react-redux'
import {StateType} from "../../reducers/types"

interface Props{
    id: number,
    mainColor: string,
    colors: string[]
}

const Square:React.FC<Props> = ({id, mainColor, colors}) => {
    return (
        <div className="square" style={{backgroundColor: colors[id]}}>
            {colors[id]}
        </div>
    )
}

const mapStateToProps = (state:StateType) =>{
    return{
        mainColor: state.mainColor,
        colors: state.colors
    }
}

export default connect(mapStateToProps)(Square);