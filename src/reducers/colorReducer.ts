import { ActionTypes, StateType } from './types'

const initialState = {
    colors: [{r: 255, g: 255, b: 255}, {r: 255, g: 255, b: 255}, {r: 255, g: 255, b: 255}, {r: 255, g: 255, b: 255}, {r: 255, g: 255, b: 255}],
    mouseX: 255,
    mouseY: 255,
    x: 254,
    y: 254
}

export const reducer = (state: StateType = initialState, action: ActionTypes) => {
    switch (action.type) {
        case "SET_COLOR":
            let colors = [...state.colors];
            colors[action.index] = action.color;
            return { ...state, colors: colors }
        case "SET_MAIN_POINTER_POSITION":
            return { ...state, x: action.x, y: action.y }
        case "SET_MOUSE_POSITION":
            return { ...state, mouseX: action.mouseX, mouseY: action.mouseY }
        default:
            return state;
    }
}