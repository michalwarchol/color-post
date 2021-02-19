import { ActionTypes, StateType } from './types'

const initialState = {
    mainColor: "rgb(255, 255, 255)",
    colors: ["rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)"],
    x: 255,
    y: 255
}

export const reducer = (state: StateType = initialState, action: ActionTypes) => {
    switch (action.type) {
        case "CHANGE_MAIN_COLOR":
            return { ...state, mainColor: action.color };
        case "SET_COLOR":
            let colors = state.colors;
            colors[action.index] = action.color;
            return { ...state, colors: colors }
        case "MOVE_MAIN_POINTER":
            return { ...state, x: action.x, y: action.y }
        default:
            return state;
    }
}