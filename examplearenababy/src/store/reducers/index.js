import { combineReducers } from "redux";


import stepReducer from "./steps";


export default combineReducers({
    step: stepReducer
});