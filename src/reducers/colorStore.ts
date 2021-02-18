import {createStore} from "redux"
import {reducer} from "./colorReducer"

const store = createStore(reducer)

export default store;