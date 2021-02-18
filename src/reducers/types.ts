export type ActionTypes = | {type: "CHANGE_MAIN_COLOR", color: string}
                        | {type: "MOVE_MAIN_POINTER", x: number, y: number}

export type StateType = {
    mainColor: string,
    x: number,
    y: number
}