import React from 'react'
import { connect } from 'react-redux'
import { StateType } from "../../reducers/types"

interface Props {
    id: number,
    colors: string[]
}

const Square: React.FC<Props> = ({ id, colors }) => {
    return (
        <div className="square" style={{ background: colors[id] }}>
            {colors[id]}
        </div>
    )
}

const mapStateToProps = (state: StateType) => ({
    colors: state.colors
})

export default connect(mapStateToProps)(Square);