export type ActionTypes = | {type: "MOVE_MAIN_POINTER", x: number, y: number}
                        | {type: "SET_COLOR", index: number, color: string}

export type StateType = {
    x: number,
    y: number,
    colors: string[]
}