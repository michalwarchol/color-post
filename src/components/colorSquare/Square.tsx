import React from 'react'
import {connect} from 'react-redux'

interface Props{
    mainColor: string
}

const Square:React.FC<Props> = ({mainColor}) => {
    return (
        <div className="square" style={{backgroundColor: mainColor}}>
            {mainColor}
        </div>
    )
}

const mapStateToProps = (state:Props) =>{
    return{
        mainColor: state.mainColor
    }
}

export default connect(mapStateToProps)(Square);