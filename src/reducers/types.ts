export type ActionTypes = | {type: "SET_MAIN_POINTER_POSITION", x: number, y: number}
                        | {type: "SET_COLOR", index: number, color: ColorType}
                        | {type: "SET_MOUSE_POSITION", mouseX: number, mouseY: number}

export type ColorType = {
    r: number,
    g: number,
    b: number
}
export type StateType = {
    mouseX: number,
    mouseY: number
    x: number,
    y: number,
    colors: ColorType[]
}